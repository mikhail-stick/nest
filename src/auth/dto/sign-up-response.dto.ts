import { Expose } from 'class-transformer';
import { ConstructableDto } from './constructable.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../user/user-role.enum';

export class SignUpResponseDto extends ConstructableDto<SignUpResponseDto> {
  @ApiProperty({ description: 'Email', nullable: false })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Role', nullable: false, enum: UserRole })
  @Expose()
  role: UserRole;
}
