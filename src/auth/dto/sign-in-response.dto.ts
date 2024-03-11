import { ConstructableDto } from './constructable.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto extends ConstructableDto<SignInResponseDto> {
  @ApiProperty({ description: 'Access token', nullable: false })
  @Expose()
  accessToken: string;
}
