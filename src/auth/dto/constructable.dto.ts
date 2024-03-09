import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ConstructableDto<T> {
  constructor(body: T) {
    Object.assign(
      this,
      plainToInstance(this.constructor as ClassConstructor<T>, body, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
