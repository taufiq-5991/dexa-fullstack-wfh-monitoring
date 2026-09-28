import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'username',
        example: ''
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'password',
        example: ''
    })
    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    password: string;
}