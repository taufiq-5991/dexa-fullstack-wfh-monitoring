
import { ResponseWrapper } from '@/common/response/wrapper.response';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface ApiResponseWrapperOptions<TModel> {
  type: TModel;
  statusCode?: number;
  isArray?: boolean;
  message?: string;
}

export const ApiResponseWrapper = <TModel extends Type<any>>(
  options: ApiResponseWrapperOptions<TModel>,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseWrapper, options.type),
    ApiResponse({
      status: options.statusCode ?? HttpStatus.OK,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseWrapper) },
          {
            properties: {
              message: {
                type: 'string',
                example: options.message ?? 'Success',
              },
              data: options.isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(options.type) },
                  }
                : { $ref: getSchemaPath(options.type) },
              logId: {
                type: 'string',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
            },
          },
        ],
      },
    }),
  );
};
