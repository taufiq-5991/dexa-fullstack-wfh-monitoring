import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';

export class CreateAttendanceDto {
    @IsNotEmpty()
    @IsString()
    employee_id: string;

    @IsNotEmpty()
    @IsDate()
    attendance_date: Date;

    @IsNotEmpty()
    @IsString()
    clock_in: string;

    @IsNotEmpty()
    @IsString()
    photo_path: string;

    @IsEnum(['Present', 'Late'])
    status: 'Present' | 'Late';
}