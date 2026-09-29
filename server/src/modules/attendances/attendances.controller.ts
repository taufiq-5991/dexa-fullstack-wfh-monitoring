import { Controller, Get, Post, Body, HttpStatus, UseGuards, Request, UnauthorizedException, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '@/common/response/error.response';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { Attendance } from '@/database/entities/attendance.entity';
import { ClockInAttendanceDto, ClockOutAttendanceDto } from './dtos/partial-attendance.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import * as dayjs from 'dayjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiTags('Attendances')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) { }

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
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `clock-in-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async clockIn(
    @Body() clockInAttendanceDto: ClockInAttendanceDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<any> {
    if (!photo) {
      throw new BadRequestException('Photo is required');
    }
  
    clockInAttendanceDto.photoPath = photo.path;
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
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `clock-out-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async clockOut(
    @Body() clockOutAttendanceDto: ClockOutAttendanceDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<any> {
    if (!photo) {
      throw new BadRequestException('Photo is required');
    }
  
    clockOutAttendanceDto.photoPathOut = photo.path;
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
  async findAll(@Request() req: ExpressRequest & { user: { role: string } }): Promise<Attendance[]> {
    // only HRD Admins can access this
    const role: string = req.user.role;
    if (role !== 'Admin HRD') {
      throw new UnauthorizedException('You are unauthorized to access this');
    } else {
      return await this.attendancesService.findAll();
    }
  }

  @ApiOperation({ summary: 'Get list of user\'s own attendances' })
  @ApiResponseWrapper({
    type: CreateAttendanceDto,
    isArray: true,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get('my-attendances')
  async findAllOwn(@Request() req: ExpressRequest & { user: { employeeId: string } }): Promise<Attendance[]> {
    const employeeId: string = req.user.employeeId;
    return await this.attendancesService.findByEmployeeId(employeeId);
  }

  // @ApiOperation({ summary: 'Get attendance detail' })
  // @ApiResponseWrapper({
  //   type: Attendance,
  // })
  // @ApiResponseWrapper({
  //   type: ErrorResponse,
  //   statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   message: 'Error',
  // })
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise < Attendance > {
  //   return await this.attendancesService.findOne(id);
  // }
}