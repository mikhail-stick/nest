import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ConstructableDto {
  constructor(body: any) {
    Object.assign(
      this,
      plainToInstance(this.constructor as ClassConstructor<any>, body, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
