import { HttpException } from '@nestjs/common';

export class Response {
  message: string;
  data: any;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

export const response = (message: string, data: any = null) =>
  new Response(message, data);

export const responseError = (message: string, code = 400) => {
  return Promise.reject(new HttpException({ message: message }, code));
};
