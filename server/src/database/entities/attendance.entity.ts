import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

// entities are stored on database folder instead of modules because an entity may depend on each other
@Entity('attendances')
export class Attendance {
    @ApiProperty({ required: false })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    attendanceDate: Date;

    @Column({ type: 'datetime' })
    clockIn: Date;

    @Column({ type: 'varchar', length: 255 })
    photoPath: string;

    @Column({ type: 'enum', enum: ['Present', 'Late'], default: 'Present' })
    status: 'Present' | 'Late';

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Employee, employee => employee.attendances)
    employee: Employee;
}