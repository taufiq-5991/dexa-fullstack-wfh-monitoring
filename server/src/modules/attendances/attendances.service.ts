import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../../database/entities/attendance.entity';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return await this.attendanceRepository.save(attendance);
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