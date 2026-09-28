import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';

export class CreateAttendanceDto {
    @IsNotEmpty()
    @IsString()
    employeeId: string;

    @IsNotEmpty()
    @IsDate()
    attendanceDate: Date;

    @IsNotEmpty()
    @IsString()
    clockIn: string;

    @IsString()
    clockOut: string;

    @IsNotEmpty()
    @IsString()
    photoPath: string;

    @IsEnum(['Present', 'Late'])
    status: 'Present' | 'Late';
}