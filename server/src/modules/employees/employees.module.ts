import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../database/entities/employee.entity';

// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeesService],
})
export class EmployeesModule {}