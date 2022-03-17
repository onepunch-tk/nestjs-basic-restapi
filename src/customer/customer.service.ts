// import { Customer } from './models/customer.model';
// import { v4 as uuid } from 'uuid';
import { GetCustomerFilterDto } from './dtos/get-customer-filter.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from './dtos/regist-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}
  //inmemory example
  // private customers: Customer[] = [];

  // getAllCustomers(): Customer[] {
  //   return this.customers;
  // }

  // getFilteredCustomers(filterDto: GetCustomerFilterDto): Customer[] {
  //   const { level, search } = filterDto;

  //   let filteredCustomers = this.getAllCustomers();

  //   if (level)
  //     filteredCustomers = filteredCustomers.filter((c) => c.level === level);
  //   if (search)
  //     filteredCustomers = filteredCustomers.filter((c) => {
  //       if (c.name.includes(search) || c.email.includes(search)) return true;
  //       return false;
  //     });

  //   return filteredCustomers;
  // }
  // getCustomerById(id: string): Customer {
  //   const foundCustomer = this.customers.find((c) => c.id === id);

  //   if (!foundCustomer) {
  //     throw new NotFoundException();
  //   }

  //   return foundCustomer;
  // }

  // registCustomer(customer: CustomerDto): Customer {
  //   const { name, age, email } = customer;
  //   const registCustomer = {
  //     id: uuid(),
  //     name,
  //     age,
  //     email,
  //     level: CustomerLevel.BRONZE,
  //   };

  //   this.customers.push(registCustomer);
  //   return registCustomer;
  // }

  // updateCustomerLevel(id: string, level: CustomerLevel): Customer {
  //   const foundCustomer = this.getCustomerById(id);
  //   foundCustomer.level = level;

  //   return foundCustomer;
  // }

  // deleteCustomer(id: string) {
  //   const foundCustomer = this.getCustomerById(id);

  //   this.customers.splice(
  //     this.customers.findIndex((c) => c.id === foundCustomer.id),
  //     1,
  //   );
  // }


  //repository on postgres
  async getCustomerById(id: string): Promise<Customer> {
    
    const found = await this.customerRepository.findOne(id);
    
    if (!found) throw new NotFoundException(`Customer with ID "${id}" not found`);

    return found;
  }

  async getCustomers(filterDto: GetCustomerFilterDto): Promise<Customer[]> {
    
    if(Object.keys(filterDto).length){
      return this.customerRepository.getFilteredCustomers(filterDto);
    }
    
    return this.customerRepository.find();
  }
  // async getFilteredCustomers()

  async registCustomer(createDto: CustomerDto): Promise<Customer> {
    return this.customerRepository.registCustomer(createDto)
  }

  async updateCustomer(id: string ,updateDto: UpdateCustomerDto): Promise<Customer>{
    const entity = await this.getCustomerById(id);
    return await this.customerRepository.save({...entity, ...updateDto});
  }

  async deleteCustomer(id: string): Promise<void> {
    
    const result = await this.customerRepository.delete(id);

    if(result.affected == 0) throw new NotFoundException(`Customer with ID "${id}" not found`);
  }
}
