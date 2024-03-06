import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationError as AppValidationError } from '../exceptions/validation.error';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new AppValidationError(this.expandError(errors));
    }
    return value;
  }
  public expandError(errors: ValidationError[]) {
    let message = '';
    const mistakes = errors[0].constraints;
    Object.keys(mistakes).forEach((key) => {
      message += mistakes[key];
    });
    return message;
  }
}
