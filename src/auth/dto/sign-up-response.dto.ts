import { Expose } from 'class-transformer';
import { ConstructableDto } from './constructable.dto';

export class SignUpResponseDto extends ConstructableDto<SignUpResponseDto> {
  @Expose()
  email: string;

  @Expose()
  role: string;
}
