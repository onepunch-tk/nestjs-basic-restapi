import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { CustomerLevel } from './../../common/define-enum';
export class GetCustomerFilterDto {
    @IsOptional()
    @IsEnum(CustomerLevel)
    level?: CustomerLevel;
    
    @IsOptional()
    @IsString()
    @Length(1)
    search?: string;
}