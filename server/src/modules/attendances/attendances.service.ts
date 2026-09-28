import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Attendance } from '../../database/entities/attendance.entity';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { ClockInAttendanceDto, ClockOutAttendanceDto } from './dtos/partial-attendance.dto';
import * as dayjs from 'dayjs';
@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async clockIn(clockInAttendanceDto: ClockInAttendanceDto): Promise<Attendance> {
    // disable duplicate attendance
    const today = dayjs().startOf('day').toDate();
    clockInAttendanceDto.attendanceDate = today;
    const todayUnfinished = await this.attendanceRepository.findOne({where: {
      employeeId: clockInAttendanceDto.employeeId,
      attendanceDate: today,
    }});
    if (!todayUnfinished) {
      const attendance = this.attendanceRepository.create(clockInAttendanceDto);
      return await this.attendanceRepository.save(attendance);
    } else {
      throw new BadRequestException('Attendance already exists for today!');
    }
  }
  // clock out
  async clockOut(clockOutAttendanceDto: ClockOutAttendanceDto): Promise<ClockOutAttendanceDto> {
    // only allow clock out today's unfinished attendance
    const today = dayjs().startOf('day').toDate();
    clockOutAttendanceDto.attendanceDate = today;
    const todayUnfinished = await this.attendanceRepository.findOne({where: {
      employeeId: clockOutAttendanceDto.employeeId,
      attendanceDate: today,
      clockOut: IsNull(),
    }});
    // clock out by updating today's unfinished clockOut
    if (todayUnfinished) {
      await this.attendanceRepository.update(todayUnfinished.id, clockOutAttendanceDto);
      return clockOutAttendanceDto;
    } else {
      throw new NotFoundException('No unfinished attendance found for today!');
    }
  }

  async findAll(): Promise<Attendance[]> {
    return await this.attendanceRepository.find();
  }

  async findOne(id: string): Promise<Attendance> {
    const attendanceData = await this.attendanceRepository.findOneBy({ id });
    if (attendanceData) {
      return attendanceData;
    } else {
      throw new NotFoundException('Attendance not found!');
    }
  }

  async update(id: string, updateAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    await this.attendanceRepository.update(id, updateAttendanceDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.attendanceRepository.delete(id);
  }
}