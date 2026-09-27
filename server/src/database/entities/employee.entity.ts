import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';
import { ApiProperty } from '@nestjs/swagger';

// entities are stored on database folder instead of modules because an entity may depend on each other
// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Entity('employees')
export class Employee {
    @ApiProperty({ required: false })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    employee_code: string;

    @Column({ type: 'varchar', length: 100 })
    full_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    phone_number: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    department: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    position: string;

    @Column({ type: 'enum', enum: ['Active', 'Inactive'], default: 'Active' })
    status: 'Active' | 'Inactive';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @OneToMany(() => Attendance, attendances => attendances.employee)
    attendances: Attendance[];
}