import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Attendance } from './entities/attendance.entity';
import { Employee } from './entities/employee.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule, // Import ConfigModule to use ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [Attendance, Employee, Role, User],
        synchronize: false, // Disable auto-sync in production
      }),
    }),
    TypeOrmModule.forFeature([Attendance, Employee, Role, User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}