import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}