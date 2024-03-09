import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationError as AppValidationError } from '../exceptions/validation.error';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new AppValidationError(this.expandError(errors));
    }
    return value;
  }
  public expandError(errors: ValidationError[]) {
    let message = '';
    const constraints = errors[0].constraints;
    if (constraints) {
      Object.keys(constraints).forEach((key) => {
        message += constraints[key];
      });
    }
    return message;
  }
}
