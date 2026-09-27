import { ApiProperty } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';

export class UpdateResponse {
  message: string;

  @ApiProperty()
  affected: number;

  @ApiProperty({ example: {} })
  raw: ObjectLiteral[];

  constructor(message: string, affected: number, raw: ObjectLiteral[]) {
    this.message = message;
    this.affected = affected;
    this.raw = raw;
  }
}
