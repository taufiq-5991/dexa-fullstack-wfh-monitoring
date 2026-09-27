import { HttpException, HttpStatus } from '@nestjs/common';

export function handleError(error: unknown): HttpException {
  if (error instanceof HttpException) {
    return error; // Already an HttpException, return it as is
  }

  const status = HttpStatus.UNPROCESSABLE_ENTITY;
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';

  return new HttpException(message, status);
}
