import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  employee_code: string;

  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone_number?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  position?: string;
}