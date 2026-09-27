import { ApiResponseProperty } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';

export class CreateResponse {
  @ApiResponseProperty({ example: '' })
  message: string;

  @ApiResponseProperty({ example: [{}] })
  raw: ObjectLiteral[];

  constructor(message: string, raw: ObjectLiteral[]) {
    this.message = message;
    this.raw = raw;
  }
}
