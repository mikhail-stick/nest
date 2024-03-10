import { ConstructableDto } from './constructable.dto';
import { Expose } from 'class-transformer';

export class SignInResponseDto extends ConstructableDto<SignInResponseDto> {
  @Expose()
  accessToken: string;
}
