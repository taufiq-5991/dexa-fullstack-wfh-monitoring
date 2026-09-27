import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '@/common/response/error.response';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { Attendance } from '@/database/entities/attendance.entity';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @ApiOperation({ summary: 'Log attendance' })
  @ApiResponseWrapper({
    type: Attendance,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance>  {
    return await this.attendancesService.create(createAttendanceDto);
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