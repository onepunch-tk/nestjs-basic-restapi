import { CustomerLevel } from './../common/define-enum';
import { CustomerDto } from './dtos/customer.dto';
import { CustomerService } from './customer.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Customer } from './models/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomer(): Customer[] {
    return this.customerService.getAllCustomers();
  }

  @Get('/:id')
  getCustomerById(@Param('id') id: string): Customer {
    return this.customerService.getCustomerById(id);
  }

  @Post()
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
