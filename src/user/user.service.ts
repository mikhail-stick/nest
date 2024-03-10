import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ServiceError } from '../exceptions/service.error';
import { UserError } from '../exceptions/enums/user-error.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new ServiceError(UserError.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(createUserProps: Pick<User, 'email' | 'password' | 'role'>) {
    return this.userRepository.save(createUserProps);
  }
}
