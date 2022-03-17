import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { CustomerLevel } from './../../common/define-enum';
export class UpdateCustomerDto {
    
    @IsOptional()
    @IsEnum(CustomerLevel)
    level: CustomerLevel;

    @IsOptional()
    @IsEmail()
    email: string;
}