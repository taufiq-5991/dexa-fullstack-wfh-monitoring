import { ApiProperty } from '@nestjs/swagger';

// * default
export class Response {
  message: string;

  @ApiProperty()
  data: any;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

export const response = (message: string, data: any = null) => {
  return new Response(message, data);
};
