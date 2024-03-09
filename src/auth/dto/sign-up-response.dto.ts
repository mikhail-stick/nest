import { Exclude, Expose } from 'class-transformer';
import { ConstructableDto } from './constructable.dto';

export class SignUpResponseDto extends ConstructableDto {
  @Exclude()
  id: number;

  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}
