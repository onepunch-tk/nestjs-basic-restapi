import { CustomerWithJoiPipe } from './../customer-with-joi.pipe';
import { CustomerPipe } from './../customer.pipe';
import { CustomerLevel } from './../common/define-enum';
import { CustomerDto } from './dtos/customer.dto';
import { CustomerService } from './customer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Customer } from './models/customer.model';
import Joi, { ObjectSchema } from 'joi';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomer(): Customer[] {
    return this.customerService.getAllCustomers();
  }

  @Get('/:id')
  getCustomerById(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ): Customer {
    return this.customerService.getCustomerById(id);
  }

  //default
  // @Post()
  // registCustomer(@Body() customer: CustomerDto): Customer {
  //   return this.customerService.registCustomer(customer);
  // }

  //사용자 정의 Pipe Binding
  // @Post()
  // registCustomer(@Body(CustomerPipe) customer: CustomerDto): Customer {
  //   return this.customerService.registCustomer(customer);
  // }

  //schema-based Pipe Binding
  @Post()
  @UsePipes(CustomerWithJoiPipe)
  registCustomer(@Body() customer: CustomerDto): Customer {
    return this.customerService.registCustomer(customer);
  }

  @Patch('/:id/level')
  updateCustomerLevel(
    @Param('id') id: string,
    @Body('level') level: CustomerLevel,
  ): Customer {
    return this.customerService.updateCustomerLevel(id, level);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string): void {
    this.customerService.deleteCustomer(id);
  }
}
