import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ErrorMsgCacheHelper } from '../helpers/errormsgcache.helper';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
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
}
