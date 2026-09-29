import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RolesService } from '@/modules/roles/roles.service';
import { UsersService } from '@/modules/users/users.service';
import { JWTPayloadDto, LoginResultDto } from './dtos/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { EmployeesService } from '@/modules/employees/employees.service';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly employeesService: EmployeesService,
    ) { }

    async login(loginDto: LoginDto): Promise<LoginResultDto> {
        try {
            // find existing user
            const findUser = (await this.usersService.findAll()).filter(user =>
                user.username === loginDto.username
            )[0];
            if (!findUser) {
                // wrong username or password returning same error message mitigates enumeration attacks
                throw new UnauthorizedException('Invalid credentials');
            }

            // verify password text against hashed password in user data
            const verifyPassword = await bcrypt.compare(loginDto.password, findUser.passwordHash);
            if (!verifyPassword) {
                // wrong username or password returning same error message mitigates enumeration attacks
                throw new UnauthorizedException('Invalid credentials');
            }

            // get current role
            const getRole = (await this.rolesService.findAll()).filter(role =>
                role.id === findUser.roleId
            )[0];
            if (!getRole) {
                throw new InternalServerErrorException({ error: "Error fetching roles data" });
            }

            // get current employee data
            const getEmployee = (await this.employeesService.findAll()).filter(employee =>
                employee.id === findUser.employeeId
            )[0];
            if (!getRole) {
                throw new InternalServerErrorException({ error: "Error fetching employees data" });
            }

            const jwtSecret = this.configService.get<string>('JWT_SECRET');
            const tokenExpiry = this.configService.get<number>('TOKEN_EXPIRY');
            const jwtPayload: JWTPayloadDto = {
                userId: findUser.id,
                employeeId: findUser.employeeId,
                employeeCode: getEmployee.employeeCode,
                username: findUser.username,
                role: getRole.roleName,
            }
            if (!jwtSecret) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const jwtToken = `Bearer ${jwt.sign(jwtPayload, jwtSecret, { expiresIn: tokenExpiry })}`;
            const result: LoginResultDto = {
                userId: findUser.id,
                employeeId: findUser.employeeId,
                employeeCode: getEmployee.employeeCode,
                username: findUser.username,
                role: getRole.roleName,
                token: jwtToken
            }
            return result;
        } catch (e) {
            console.log(e, 'Error logging in');
            throw e;
        }
    }

    async verifyToken(token: string): Promise<JWTPayloadDto> {
        try {
            let jwtToken = token;
            if (token.startsWith("Bearer ")) {
                jwtToken = token.substring(7);
            }
            const jwtSecret = this.configService.get<string>('JWT_SECRET');
            if (!jwtSecret) {
                throw new UnauthorizedException('Invalid token');
            }
            return jwt.verify(jwtToken, jwtSecret) as JWTPayloadDto;
        } catch (e) {
            console.log(e, 'Error verifying token');
            throw e;
        }
    }
}