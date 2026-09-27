import { ApiProperty } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';

export class DeleteResponse {
  message: string;

  @ApiProperty()
  affected: number;

  constructor(message: string, affected: number) {
    this.message = message;
    this.affected = affected;
  }
}
