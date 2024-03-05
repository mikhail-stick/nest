import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRole } from '../user/user-role.enum';
import * as bcrypt from 'bcrypt';
import { HASH_SALT } from './auth.constants';
import { ServiceError } from '../exceptions/service.error';
import { PrincipalType } from './types/principal.type';

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
    const user = await this.userService.findOneByEmail(email);

    this.assertPasswordMatch(user?.password, password);

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
    const isExist = await this.userService.findOneByEmail(signUpDto.email);

    if (isExist) {
      throw new ServiceError('User already exist');
    }

    const hash = await bcrypt.hash(signUpDto.password, HASH_SALT);

    return await this.userService.createUser({
      email: signUpDto.email,
      password: hash,
      role: UserRole.User,
    });
  }
}
