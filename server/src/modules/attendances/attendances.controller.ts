import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '@/common/response/error.response';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { Attendance } from '@/database/entities/attendance.entity';
import { ClockInAttendanceDto, ClockOutAttendanceDto } from './dtos/partial-attendance.dto';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @ApiOperation({ summary: 'Clock in attendance' })
  @ApiResponseWrapper({
    type: Attendance,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post('clock-in')
  async clockIn(@Body() clockInAttendanceDto: ClockInAttendanceDto): Promise<Attendance>  {
    return await this.attendancesService.clockIn(clockInAttendanceDto);
  }

  @ApiOperation({ summary: 'Clock out attendance' })
  @ApiResponseWrapper({
    type: Attendance,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post('clock-out')
  async clockOut(@Body() clockOutAttendanceDto: ClockOutAttendanceDto): Promise<ClockOutAttendanceDto>  {
    return await this.attendancesService.clockOut(clockOutAttendanceDto);
  }
  
  @ApiOperation({ summary: 'Get list of attendances' })
  @ApiResponseWrapper({
    type: CreateAttendanceDto,
    isArray: true,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get()
  async findAll(): Promise<Attendance[]> {
    return await this.attendancesService.findAll();
  }
  
  @ApiOperation({ summary: 'Get attendance detail' })
  @ApiResponseWrapper({
    type: Attendance,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attendance> {
    return await this.attendancesService.findOne(id);
  }
}