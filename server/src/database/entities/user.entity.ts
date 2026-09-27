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

    @OneToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column()
    password_hash: string;

    @Column({unique: false, nullable: false })
    role_id: string;

    @ManyToOne(() => Role, role => role.id, { nullable: false })
    @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
    role: Role;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}