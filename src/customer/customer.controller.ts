import { GetCustomerFilterDto } from './dtos/get-customer-filter.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CustomerWithJoiPipe } from './../customer-with-joi.pipe';
import { CustomerPipe } from './../customer.pipe';
import { CustomerDto } from './dtos/regist-customer.dto';
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
  Query,
  UsePipes,
} from '@nestjs/common';
import { Customer } from './models/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  //not used async
  // @Get()
  // getCustomer(@Query() filterDto: GetCustomerFilterDto): Customer[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.customerService.getFilteredCustomers(filterDto);
  //   } else {
  //     return this.customerService.getAllCustomers();
  //   }
  // }

  // @Get('/:id')
  // getCustomerById(
  //   @Param(
  //     'id',
  //     new ParseUUIDPipe({
  //       version: '4',
  //       errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  //     }),
  //   )
  //   id: string,
  // ): Customer {
  //   return this.customerService.getCustomerById(id);
  // }

  // default;
  // @Post()
  // registCustomer(@Body() customer: CustomerDto): Customer {
  //   return this.customerService.registCustomer(customer);
  // }

  // //사용자 정의 Pipe Binding
  // // @Post()
  // // registCustomer(@Body(CustomerPipe) customer: CustomerDto): Customer {
  // //   return this.customerService.registCustomer(customer);
  // // }

  // //schema-based Pipe Binding
  // // @Post()
  // // @UsePipes(CustomerWithJoiPipe)
  // // registCustomer(@Body() customer: CustomerDto): Customer {
  // //   return this.customerService.registCustomer(customer);
  // // }

  // @Patch('/:id/level')
  // updateCustomerLevel(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ): Customer {
  //   const { level } = updateCustomerDto;
  //   return this.customerService.updateCustomerLevel(id, level);
  // }

  // @Delete('/:id')
  // deleteCustomer(@Param('id') id: string): void {
  //   this.customerService.deleteCustomer(id);
  // }

  @Get('/:id')
  getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Get()
  getCustomer(@Query() filterDto: GetCustomerFilterDto): Promise<Customer[]> {
    if (Object.keys(filterDto).length) {
      //..
    }

    return this.customerService.getCustomers(filterDto);
  }

  @Post()
  registCustomer(@Body() createDto: CustomerDto): Promise<Customer> {
    return this.customerService.registCustomer(createDto);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
  @Patch('/:id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const { level } = updateDto;
    return this.customerService.updateCustomer(id, updateDto);
  }
}
