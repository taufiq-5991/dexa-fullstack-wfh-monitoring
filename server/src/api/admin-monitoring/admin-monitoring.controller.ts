import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Employee } from '../../database/entities/employee.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { ErrorResponse } from '@/common/response/error.response';
import { CreateEmployeeUserDto } from './dtos/create-employee-user.dto';
import { AdminMonitoringService } from './admin-monitoring.service';
import { HashPasswordDto } from './dtos/hash-password.dto';
import { CreateEmployeeDto } from '@/common/dtos';

@ApiTags('Admin Monitoring')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
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
  async hashPassword(@Request() req: ExpressRequest & { user: { role: string } }, @Body() rawPassword: HashPasswordDto): Promise<string> {
    try {
      // only HRD Admins can access this
      const role: string = req.user.role;
      if (role !== 'Admin HRD') {
        throw new UnauthorizedException('You are unauthorized to access this');
      } else {
        return this.adminMonitoringService.hashPassword(rawPassword);
      }
    } catch (e) {
      throw e;
    }
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
  async create(@Request() req: ExpressRequest & { user: { role: string } }, @Body() createEmployeeUserDto: CreateEmployeeUserDto): Promise<CreateEmployeeUserDto> {
    try {
      // only HRD Admins can access this
      const role: string = req.user.role;
      if (role !== 'Admin HRD') {
        throw new UnauthorizedException('You are unauthorized to access this');
      } else {
        return this.adminMonitoringService.create(createEmployeeUserDto);
      }
    } catch (e) {
      throw e;
    }
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
  async findAll(@Request() req: ExpressRequest & { user: { role: string } }): Promise<CreateEmployeeDto[]> {
    try {
      // only HRD Admins can access this
      const role: string = req.user.role;
      if (role !== 'Admin HRD') {
        throw new UnauthorizedException('You are unauthorized to access this');
      } else {
        return this.adminMonitoringService.findAll();
      }
    } catch (e) {
      throw e;
    }
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
  async findOne(@Request() req: ExpressRequest & { user: { role: string } }, @Param('id') id: string): Promise<CreateEmployeeDto> {
    try {
      // only HRD Admins can access this
      const role: string = req.user.role;
      if (role !== 'Admin HRD') {
        throw new UnauthorizedException('You are unauthorized to access this');
      } else {
        return this.adminMonitoringService.findOne(id);
      }
    } catch (e) {
      throw e;
    }
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
  async update(@Request() req: ExpressRequest & { user: { role: string } }, @Param('id') id: string, @Body() updateEmployeeUserDto: CreateEmployeeUserDto): Promise<any> {
    try {
      // only HRD Admins can access this
      const role: string = req.user.role;
      if (role !== 'Admin HRD') {
        throw new UnauthorizedException('You are unauthorized to access this');
      } else {
        return this.adminMonitoringService.update(id, updateEmployeeUserDto);
      }
    } catch (e) {
      throw e;
    }
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
  async remove(@Request() req: ExpressRequest & { user: { employeeId: string, role: string } }, @Param('id') id: string): Promise<{ result: string }> {
    try {
      // only HRD Admins can access this
      const role: string = req.user.role;
      if (req.user.employeeId === id) {
        throw new UnauthorizedException('You cannot delete your own account');
      }
      if (role !== 'Admin HRD') {
        throw new UnauthorizedException('You are unauthorized to access this');
      } else {
        return this.adminMonitoringService.remove(id);
      }
    } catch (e) {
      throw e;
    }
  }
}