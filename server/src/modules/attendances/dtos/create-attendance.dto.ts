import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';

export class CreateAttendanceDto {
    @ApiProperty({
        description: 'employeeId',
        example: ''
    })
    @IsNotEmpty()
    @IsString()
    employeeId: string;

    @IsNotEmpty()
    @IsDate()
    attendanceDate: Date;

    @ApiProperty({
        description: 'clockIn',
    })
    @IsNotEmpty()
    @IsDate()
    clockIn: Date;

    @ApiProperty({
        description: 'clockOut',
    })
    @IsDate()
    clockOut: Date;

    @ApiProperty({
        description: 'photoPath',
        example: ''
    })
    @IsNotEmpty()
    @IsString()
    photoPath: string;

    @ApiProperty({
        description: 'photoPathOut',
        example: ''
    })
    @IsNotEmpty()
    @IsString()
    photoPathOut: string;

    @IsEnum(['Present', 'Late'])
    status: 'Present' | 'Late';
}