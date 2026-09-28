import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateEmployeeUserDto {
    @ApiProperty({
        description: 'employeeCode',
        example: 'DEFY-15-0001'
    })
    @IsNotEmpty()
    employeeCode: string;

    @ApiProperty({
        description: 'fullName',
        example: 'AK-15'
    })
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        description: 'email',
        example: 'ak15@defy.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'phoneNumber',
        example: '0856-1001-1215'
    })
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({
        description: 'department',
        example: 'Team DEFY'
    })
    @IsOptional()
    @IsString()
    department?: string;

    @ApiProperty({
        description: 'position',
        example: 'Sentient Humanoid Robot'
    })
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty({
        description: 'username',
        example: 'ak15'
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'password',
        example: 'Pass123!'
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 255)
    password: string;

    @ApiProperty({
        description: 'roleId',
        example: '06d3edfa-7882-4d10-b052-ecb7f8cf9841'
    })
    @IsNotEmpty()
    @IsString()
    roleId: string;
}