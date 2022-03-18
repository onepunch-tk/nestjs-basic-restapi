import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  age: number;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
