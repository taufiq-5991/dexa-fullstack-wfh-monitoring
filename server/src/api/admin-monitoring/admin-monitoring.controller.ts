import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { Employee } from '../../database/entities/employee.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { ErrorResponse } from '@/common/response/error.response';
import { CreateEmployeeUserDto } from './dtos/create-employee-user.dto';
import { AdminMonitoringService } from './admin-monitoring.service';
import { HashPasswordDto } from './dtos/hash-password.dto';
import { CreateEmployeeDto } from '@/common/dtos';

@ApiTags('Admin Monitoring')
@Controller('admin-monitoring')
export class AdminMonitoringController {
  constructor(private readonly adminMonitoringService: AdminMonitoringService) {}


  @ApiOperation({ summary: 'Hash password from string' })
  @ApiResponseWrapper({
    type: HashPasswordDto,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post('hash-password')
  async hashPassword(@Body() rawPassword: HashPasswordDto): Promise<string> {
    return this.adminMonitoringService.hashPassword(rawPassword);
  }

  @ApiOperation({ summary: 'Create new employee and user data' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post()
  async create(@Body() createEmployeeUserDto: CreateEmployeeUserDto): Promise<CreateEmployeeUserDto> {
    return this.adminMonitoringService.create(createEmployeeUserDto);
  }

  @ApiOperation({ summary: 'Get list of employees with user ID & role' })
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
  async findAll(): Promise<CreateEmployeeDto[]> {
    return this.adminMonitoringService.findAll();
  }

  @ApiOperation({ summary: 'Get employee detail with user ID, role, and attendances' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreateEmployeeDto> {
    return this.adminMonitoringService.findOne(id);
  }

  @ApiOperation({ summary: 'Update employee and user data by employee ID' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeUserDto: CreateEmployeeUserDto): Promise<any> {
    return this.adminMonitoringService.update(id, updateEmployeeUserDto);
  }


  @ApiOperation({ summary: 'Delete employee, user data, and attendances' })
  @ApiResponseWrapper({
    type: Employee,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{result: string}> {
    return this.adminMonitoringService.remove(id);
  }
}