import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { EmployeesService } from '@/modules/employees/employees.service';
import { UsersService } from '@/modules/users/users.service';
import { RolesController } from '@/modules/roles/roles.controller';
import { AttendancesController } from '@/modules/attendances/attendances.controller';
import { RolesService } from '@/modules/roles/roles.service';
import { AttendancesService } from '@/modules/attendances/attendances.service';
import { UsersModule } from '@/modules/users/users.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { AttendancesModule } from '@/modules/attendances/attendances.module';
import { EmployeesModule } from '@/modules/employees/employees.module';
import { AdminMonitoringController } from './admin-monitoring.controller';
import { AdminMonitoringService } from './admin-monitoring.service';

// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Module({
    imports: [
        DatabaseModule,
        EmployeesModule,
        UsersModule,
        RolesModule,
        AttendancesModule
    ],
    controllers: [
        AdminMonitoringController,
        // master data
        RolesController,
        AttendancesController
    ],
    providers: [
        AdminMonitoringService,
        // master data
        EmployeesService,
        UsersService,
        RolesService,
        AttendancesService
    ],
})
export class AdminMonitoringModule { }