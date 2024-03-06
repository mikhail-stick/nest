import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ServiceError } from '../exceptions/service.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new ServiceError('User was not found');
    }

    return user;
  }

  async createUser(createUserProps: Pick<User, 'email' | 'password' | 'role'>) {
    return await this.userRepository.save(createUserProps);
  }
}
