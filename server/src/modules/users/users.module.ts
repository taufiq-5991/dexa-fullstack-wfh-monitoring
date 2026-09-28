import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

// separation of employee data from user login data is an industry-standard database architecture pattern in HR systems
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule {}