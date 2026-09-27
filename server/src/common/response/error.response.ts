export class ErrorResponse {
  message: string | string[];

  constructor(message: string | string[]) {
    this.message = message;
  }
}
