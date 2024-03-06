import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRole } from '../user/user-role.enum';
import * as bcrypt from 'bcrypt';
import { HASH_SALT } from './auth.constants';
import { ServiceError } from '../exceptions/service.error';
import { PrincipalType } from './types/principal.type';
import { normalizeEmail } from 'validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const normalizedEmail = this.assertEmail(email);

    const user = await this.userService.findOneByEmailOrFail(normalizedEmail);

    this.assertPasswordMatch(user.password, password);

    const payload: PrincipalType = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  assertPasswordMatch(hashedPassword: string | Buffer, password: string) {
    const isMatch = bcrypt.compare(hashedPassword, password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const normalizedEmail = this.assertEmail(signUpDto.email);

    await this.assertUserNotExist(normalizedEmail);

    const hash = await bcrypt.hash(signUpDto.password, HASH_SALT);

    return await this.userService.createUser({
      email: normalizedEmail,
      password: hash,
      role: UserRole.User,
    });
  }

  assertEmail(email: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      throw new ServiceError('Incorrect email');
    }

    return normalizedEmail;
  }

  async assertUserNotExist(email: string) {
    const isExist = await this.userService.findOneByEmail(email);

    if (isExist) {
      throw new ServiceError('User already exist');
    }
  }
}
