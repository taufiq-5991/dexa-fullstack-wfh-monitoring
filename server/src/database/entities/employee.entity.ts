import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

// entities are stored on database folder instead of modules because an entity may depend on each other
// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Entity('employees')
export class Employee {
    @ApiProperty({ required: false })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'employee_code', type: 'varchar', length: 20, unique: true })
    employeeCode: string;

    @Column({ name: 'full_name', type: 'varchar', length: 100 })
    fullName: string;

    @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 15, nullable: true })
    phoneNumber: string;

    @Column({ name: 'department', type: 'varchar', length: 50, nullable: true })
    department: string;

    @Column({ name: 'position', type: 'varchar', length: 50, nullable: true })
    position: string;

    @Column({ name: 'status', type: 'enum', enum: ['Active', 'Inactive'], default: 'Active' })
    status: 'Active' | 'Inactive';

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    // relations
    @OneToMany(() => User, users => users.employee)
    users: User[];
}