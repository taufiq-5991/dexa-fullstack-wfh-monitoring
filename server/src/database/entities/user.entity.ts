import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Role } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';

// entities are stored on database folder instead of modules because an entity may depend on each other
// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Entity('users')
export class User {
    @ApiProperty({ required: false })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'username', unique: true, nullable: false })
    username: string;

    @Column({name: 'password_hash'})
    passwordHash: string;

    @Column({name: 'role_id', unique: false, nullable: false })
    roleId: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    // relations
    @OneToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
    employee: Employee;

    @OneToOne(() => Role, role => role.id, { nullable: false })
    @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
    role: Role;
}