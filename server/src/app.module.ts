import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AttendancesModule } from './modules/attendances/attendances.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
      envFilePath: ['.env'], // Specify the path to your environment file
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'public'),
      serveRoot: '/public',
      serveStaticOptions: {
        index: false,
      },
    }),
    DatabaseModule,
    RolesModule,
    UsersModule,
    EmployeesModule,
    AttendancesModule,
  ],
})
export class AppModule {}