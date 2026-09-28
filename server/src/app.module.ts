import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AttendancesModule } from './modules/attendances/attendances.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminMonitoringModule } from './api/admin-monitoring/admin-monitoring.module';
import { AuthModule } from './api/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
      envFilePath: ['.env'], // Specify the path to your environment file
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<number>('TOKEN_EXPIRY')
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'public'),
      serveRoot: '/public',
      serveStaticOptions: {
        index: false,
      },
    }),
    DatabaseModule,
    // API modules
    AdminMonitoringModule,
    AuthModule,
    // master data modules
    RolesModule,
    UsersModule,
    EmployeesModule,
    AttendancesModule,
  ],
})
export class AppModule {}