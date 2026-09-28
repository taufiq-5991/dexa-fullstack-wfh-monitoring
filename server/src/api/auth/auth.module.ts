import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { EmployeesModule } from '@/modules/employees/employees.module';
import { EmployeesService } from '@/modules/employees/employees.service';
import { RolesController } from '@/modules/roles/roles.controller';
import { RolesModule } from '@/modules/roles/roles.module';
import { RolesService } from '@/modules/roles/roles.service';
import { UsersModule } from '@/modules/users/users.module';
import { UsersService } from '@/modules/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        DatabaseModule,
        EmployeesModule,
        UsersModule,
        RolesModule,
    ],
    controllers: [
        AuthController,
        // master data
        RolesController,
    ],
    providers: [
        AuthService,
        // master data
        EmployeesService,
        UsersService,
        RolesService,
    ],
})
export class AuthModule { }