import { CustomerLevel } from './../common/define-enum';
import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dtos/customer.dto';
import { Customer } from './models/customer.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: string): Customer {
    return this.customers.find((c) => c.id === id);
  }

  registCustomer(customer: CustomerDto): Customer {
    const { name, age } = customer;
    const registCustomer = {
      id: uuid(),
      name,
      age,
      level: CustomerLevel.BRONZE,
    };

    this.customers.push(registCustomer);
    return registCustomer;
  }

  updateCustomerLevel(id: string, level: CustomerLevel): Customer {
    const updateCustomer = this.getCustomerById(id);
    updateCustomer.level = level;

    return updateCustomer;
  }

  deleteCustomer(id: string) {
    this.customers.splice(
      this.customers.findIndex((c) => c.id === id),
      1,
    );
  }
}
