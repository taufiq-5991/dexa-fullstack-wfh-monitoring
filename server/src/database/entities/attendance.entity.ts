import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

// entities are stored on database folder instead of modules because an entity may depend on each other
@Entity('attendances')
export class Attendance {
    @ApiProperty({ required: false })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'employee_id', nullable: false })
    employeeId: string;

    @Column({ name: 'attendance_date', type: 'date' })
    attendanceDate: Date;

    @Column({ name: 'clock_in', type: 'datetime' })
    clockIn: Date;

    @Column({ name: 'clock_out', type: 'datetime' })
    clockOut: Date;

    @Column({ name: 'photo_path', type: 'varchar', length: 255 })
    photoPath: string;

    @Column({ name: 'status', type: 'enum', enum: ['Present', 'Late'], default: 'Present' })
    status: 'Present' | 'Late';

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}