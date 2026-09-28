import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JWTPayloadDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    employeeId: string;

    @IsNotEmpty()
    @IsString()
    employeeCode: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    role: string;
}

export class LoginResultDto extends JWTPayloadDto {
    @ApiProperty({
        description: 'token',
        example: ''
    })
    @IsNotEmpty()
    @IsString()
    token: string;
}