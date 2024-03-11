import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInBodyDto {
  @ApiProperty({ description: 'Email', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', nullable: false })
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
