import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

// entities are stored on database folder instead of modules because an entity may depend on each other
@Entity('roles')
export class Role {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'role_name',
    type: 'enum',
    enum: ['Admin HRD', 'Karyawan'],
    default: 'Karyawan',
    unique: true,
  })
  roleName: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}