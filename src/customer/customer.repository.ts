import { NotFoundException } from '@nestjs/common';
import { x } from 'joi';
import { CustomerLevel } from 'src/common/define-enum';
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { GetCustomerFilterDto } from './dtos/get-customer-filter.dto';
import { CustomerDto } from './dtos/regist-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async getFilteredCustomers(
    filterDto: GetCustomerFilterDto,
  ): Promise<Customer[]> {
    const { level, search } = filterDto;

    return (await this.find()).filter((c) => {
      if (
        c.level === level ||
        (search && (c.email.includes(search) || c.name.includes(search)))
      ) {
        return true;
      }

      return false;
    });
  }

  async registCustomer(customer: CustomerDto): Promise<Customer> {
    const { name, age, email } = customer;

    const entity = this.create({
      name,
      age,
      email,
      level: CustomerLevel.BRONZE,
    });

    await this.save(entity);
    return entity;
  }
}
