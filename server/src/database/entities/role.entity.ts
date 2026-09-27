import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// entities are stored on database folder instead of modules because an entity may depend on each other
@Entity('roles')
export class Role {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['Admin HRD', 'Karyawan'],
    default: 'Karyawan',
    unique: true,
  })
  role_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}