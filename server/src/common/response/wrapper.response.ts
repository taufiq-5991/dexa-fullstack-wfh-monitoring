import { ApiProperty } from '@nestjs/swagger';

export class ResponseWrapper<T> {
  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ type: Object })
  data: T;
}
