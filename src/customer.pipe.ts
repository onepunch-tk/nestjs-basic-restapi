import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

//사용자 정의 Pipe
@Injectable()
export class CustomerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.name || !value.age) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The key of arguments is incorrect.',
      });
    }

    if (!parseInt(value.age)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Casting failed for age',
      });
    }

    return value;
  }
}
