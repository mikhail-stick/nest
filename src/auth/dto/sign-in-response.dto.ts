import { ConstructableDto } from './constructable.dto';
import { Expose } from 'class-transformer';

export class SignInResponseDto extends ConstructableDto {
  @Expose()
  accessToken: string;
}
