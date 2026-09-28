import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { Employee } from '../../database/entities/employee.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { ErrorResponse } from '@/common/response/error.response';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Create new employee' })
  @ApiResponseWrapper({
    type: CreateEmployeeDto,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Get list of employees' })
  @ApiResponseWrapper({
    type: Employee,
    isArray: true,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @ApiOperation({ summary: 'Get employee detail' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update employee' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.update(id, updateEmployeeDto);
  }


  @ApiOperation({ summary: 'Delete employee' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeesService.remove(id);
  }
}