import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto) {
    const isExist = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );
    if (isExist) {
      throw new HttpException('User already exist.', HttpStatus.BAD_REQUEST);
    }
    const user = this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(user);
  }
}
