import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorMsgCacheHelper } from '../helpers/errormsgcache.helper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
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
