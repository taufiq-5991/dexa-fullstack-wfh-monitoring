import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ErrorMsgCacheHelper } from '../helpers/errormsgcache.helper';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof QueryFailedError) {
      return this.handleQueryFailedError(exception, host);
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, host);
    }

    return this.handleOtherException(exception, host);
  }

  

  private handleQueryFailedError(
    exception: QueryFailedError, 
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const headers = request.headers;
    const logId = headers.logId;

    const languange = headers['x-language'] || 'en';
    const pgErrorCode = (exception as any).code; // * Postgres
    const mysqlErrorCode = (exception as any).errno; // * MySQL
    const errorMessage = (exception as any).message || 'Unknown database error';

    const errStatus = HttpStatus.UNPROCESSABLE_ENTITY;
    const errMessage = ErrorMsgCacheHelper.hasError(pgErrorCode, languange)
      ? ErrorMsgCacheHelper.getError(pgErrorCode, languange)
      : errorMessage;

    this.logger.error(
      {
        errCode: `PG Code: ${pgErrorCode}, MySQL Code: ${mysqlErrorCode}`,
        exception: exception,
        requestUrl: request.url,
        requestMethod: request.method,
        requestBody: request.body,
        requestQuery: request.query,
      },
      'Database Error | QueryFailedError Exception',
    );

    response.status(errStatus).json({
      message: errMessage,
      data: null,
      logId,
    });
  }

  private handleOtherException(
    exception: any, 
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    const headers = request.headers;
    const logId = headers.logId;

    this.logger.error(
      {
        exception: exception,
        exceptionStack: exception.stack,
        requestUrl: request.url,
        requestMethod: request.method,
        requestBody: request.body,
        requestQuery: request.query,
      },
      'Error Other Exception',
    );

    // this should not happen, but just in case
    if (
      exception?.type === 'entity.too.large' ||
      exception?.statusCode === HttpStatus.PAYLOAD_TOO_LARGE ||
      exception?.name === 'PayloadTooLargeError'
    ) {
      return response.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
        message: `Payload too large. ${exception.message}`,
        data: null,
        logId
      });
    }

    // Fallback: unknown error
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Internal server error. ${exception.message}`,
      data: null,
      logId
    });
  }

  private handleHttpException(
    exception: HttpException, 
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const headers = request.headers;
    const logId = headers.logId;

    const languange = headers['x-language'] || 'en';
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    
    this.logger.error(
      {
        exception: exception,
        exceptionStack: exception.stack,
        requestUrl: request.url,
        requestMethod: request.method,
        requestBody: request.body,
        requestQuery: request.query,
      },
      'Error HTTP Exception',
    );

    // * class validator error
    if (
      status === HttpStatus.BAD_REQUEST &&
      typeof errorResponse === 'object' &&
      errorResponse.hasOwnProperty('message') &&
      Array.isArray((errorResponse as Record<string, unknown>).message)
    ) {
      response.status(status).json({
        message: 'Validation Error',
        data: {
          listMessage: (errorResponse as Record<string, unknown>)?.message,
        },
        logId,
      });
    } else {
      let errCodeOrMessage: string;
      let errorData: object | null = null;

      if (typeof errorResponse === 'string') {
        errCodeOrMessage = errorResponse;
      } else {
        // * object
        errCodeOrMessage = (errorResponse as Record<string, string>)?.message ?? 'Unknown error';
        errorData = (errorResponse as Record<string, unknown>).data ?? null;
      }

      const message = ErrorMsgCacheHelper.hasError(errCodeOrMessage, languange)
        ? ErrorMsgCacheHelper.getError(errCodeOrMessage, languange)
        : errCodeOrMessage;

      response.status(status).json({
        message,
        data: errorData,
        logId,
      });
    }
  }
}