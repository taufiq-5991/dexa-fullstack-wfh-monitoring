import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEmployeeUserDto } from './dtos/update-employee-user.dto';
import { CreateEmployeeUserDto } from './dtos/create-employee-user.dto';
import { CreateEmployeeDto, CreateUserDto } from '@/common/dtos';
import { HashPasswordDto } from './dtos/hash-password.dto';
import { EmployeesService } from '@/modules/employees/employees.service';
import { UsersService } from '@/modules/users/users.service';
import { RolesService } from '@/modules/roles/roles.service';
import { AttendancesService } from '@/modules/attendances/attendances.service';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AdminMonitoringService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly attendancesService: AttendancesService,
  ) {}

  async hashPassword(rawPassword: HashPasswordDto): Promise<string> {
    return await bcrypt.hash(rawPassword.password, 10);
  }

  async create(createEmployeeUserDto: CreateEmployeeUserDto): Promise<CreateEmployeeUserDto> {
    try {
      // hash password first
      createEmployeeUserDto.password = await bcrypt.hash(createEmployeeUserDto.password, 10);
    
      // create employee before user because user depends on employee ID
      const {username, password, roleId, ...employeeDataFiltered} = createEmployeeUserDto;
      const employeeDataNewDto: CreateEmployeeDto = employeeDataFiltered;
      const employee = await this.employeesService.create(employeeDataNewDto);
    
      // extract employee ID for user creation
      const employeeId = employee.id;
    
      // create user
      const {employeeCode, fullName, email, phoneNumber, department, position, ...userDataFiltered} = createEmployeeUserDto;
      const userDataNewDto: CreateUserDto = {
        passwordHash: createEmployeeUserDto.password, 
        employeeId: employeeId, 
        ...userDataFiltered
      };
      const user = await this.usersService.create(userDataNewDto);
      return createEmployeeUserDto;

    } catch (e) {
      console.log(e, 'Error create employee and user');
      throw e;
    }
  }

  async findAll(): Promise<CreateEmployeeDto[]> {
    try {
      // find all employees, users, and roles first
      const employees = await this.employeesService.findAll();
      const users = await this.usersService.findAll();
      const roles = await this.rolesService.findAll();
    
      // join them together, appending 'username' from users table and 'roleName' from roles table
      const employeeUserJoin = employees.map(employee => {
        const user = users.find(user => user.employeeId === employee.id);
        return {
          ...employee,
          username: user ? user.username : null,
          roleName: user ? roles.find(o => o.id === user.roleId)?.roleName : null,
        };
      })
      return employeeUserJoin;
    } catch (e) {
      console.log(e, 'Error view all employee and user');
      throw e;
    }
  }

  async findOne(id: string): Promise<CreateEmployeeDto> {
    try {
      const employees = await this.employeesService.findOne(id);
      const users = (await this.usersService.findAll()).filter(user => user.employeeId === employees.id);
      const roles = await this.rolesService.findAll();
      const attendances = (await this.attendancesService.findAll()).filter(attendance => attendance.employeeId === employees.id);
      const employeeUserJoin = [employees].map(employee => {
        const user = users.find(user => user.employeeId === employee.id);
        return {
          ...employee,
          username: user ? user.username : null,
          roleName: user ? roles.find(o => o.id === user.roleId)?.roleName : null,
          attendances: attendances?.length > 0 ? attendances : []
        };
      })[0]
      if (employeeUserJoin) {
        return employeeUserJoin;
      } else {
        throw new NotFoundException('Employee not found!');
      }
    } catch (e) {
      console.log(e, `Error view employee ID ${id}`);
      throw e;
    }
  }

  async update(id: string, updateEmployeeUserDto: CreateEmployeeUserDto): Promise<UpdateEmployeeUserDto> {
    try {
      // hash password first
      updateEmployeeUserDto.password = await bcrypt.hash(updateEmployeeUserDto.password, 10);
      
      // update employee before user
      const {username, password, roleId, ...employeeDataFiltered} = updateEmployeeUserDto;
      const employeeDataNewDto: CreateEmployeeDto = employeeDataFiltered;
      const employee = await this.employeesService.update(id, employeeDataNewDto);
    
      // get current user ID by employee ID for update
      const getCurrentUser = (await this.usersService.findAll()).filter(user => user.employeeId === id)[0];
    
      // update user
      const {employeeCode, fullName, email, phoneNumber, department, position, ...userDataFiltered} = updateEmployeeUserDto;
      // delete 'password' entry
      delete (userDataFiltered as Partial<CreateEmployeeUserDto>).password;
      const userDataNewDto: CreateUserDto = {
        passwordHash: updateEmployeeUserDto.password, 
        employeeId: id, 
        ...userDataFiltered
      };
      const user = await this.usersService.update(getCurrentUser.id, userDataNewDto);
      
      return updateEmployeeUserDto;
    } catch (e) {
      console.log(e, 'Error create employee and user');
      throw e;
    }
  }

  async remove(id: string): Promise<{result: string}> {
    // delete order: attendances -> user -> employee
    try {
      // delete attendances first by employee ID
      const attendances = (await this.attendancesService.findAll()).filter(attendance => attendance.employeeId === id);
      for (const attendance of attendances) {
        await this.attendancesService.remove(attendance.id);
      }
      
      // delete user by employee ID
      const users = (await this.usersService.findAll()).filter(user => user.employeeId === id);
      for (const user of users) {
        await this.usersService.remove(user.id);
      }

      // delete employee
      await this.employeesService.remove(id);
      return {result: `Success delete employee ID ${id}`};
    } catch (e) {
      console.log(e, `Error delete employee ID ${id}`);
      throw e;
    }
  }
}