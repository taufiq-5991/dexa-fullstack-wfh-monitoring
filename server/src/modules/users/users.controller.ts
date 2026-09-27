import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '../../database/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { ErrorResponse } from '@/common/response/error.response';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponseWrapper({
    type: CreateUserDto,
  })
  @ApiResponseWrapper({
    type: ErrorResponse,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Error',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponseWrapper({
    type: User,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }


  @ApiOperation({ summary: 'Get user detail' })
  @ApiResponseWrapper({
    type: User,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}