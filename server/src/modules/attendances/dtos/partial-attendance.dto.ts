import { OmitType } from '@nestjs/swagger';
import { CreateAttendanceDto } from './create-attendance.dto';

export class ClockInAttendanceDto extends OmitType(CreateAttendanceDto, ['clockOut', 'photoPathOut'] as const) {
}
export class ClockOutAttendanceDto extends OmitType(CreateAttendanceDto, ['clockIn', 'photoPath'] as const) {
}