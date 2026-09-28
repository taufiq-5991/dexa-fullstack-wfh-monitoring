import { Controller, Get, Post, Body, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '../../database/entities/role.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { ErrorResponse } from '@/common/response/error.response';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Roles')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Get list of roles' })
  @ApiResponseWrapper({
    type: Role,
    isArray: true,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Get role detail' })
  @ApiResponseWrapper({
    type: Role,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }
}