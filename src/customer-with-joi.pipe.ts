import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import joi = require('joi');

@Injectable()
export class CustomerWithJoiPipe implements PipeTransform {
  schema: joi.ObjectSchema;
  constructor() {
    this.schema = joi
      .object({
        name: joi.string().max(16).required(),
        age: joi.number().integer().max(150),
      })
      .with('name', 'age');
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('validation failed');
    }
    return value;
  }
}
