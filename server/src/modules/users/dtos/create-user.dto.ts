import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  passwordHash: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}