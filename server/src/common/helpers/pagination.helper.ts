import { BadRequestException, Type } from '@nestjs/common';
import { Between, FindOptionsOrder, FindOptionsWhere, Like } from 'typeorm';
import * as dayjs from 'dayjs';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export const PaginationDefaultOptions = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_ORDER: 'ASC',
};

interface FiltersColumnPagination {
  [key: string]: string | number | boolean | Date;
}

export function getWhereOrderOptionsPagination(
  orderBy: string | null,
  order: string = 'ASC',
  search: string | undefined,
  filters: FiltersColumnPagination,
  columnsMetadata: ColumnMetadata[],
) {
  let whereOptions: FindOptionsWhere<any>[] | FindOptionsWhere<any> = [];
  let orderOptions: FindOptionsOrder<any> = {};

  if (search) {
    // * general search
    columnsMetadata.forEach((col) => {
      const genSearch = paginateGenerateWhereCondition(
        col.propertyName,
        search,
        col.type as string,
        true,
      );
      // * OR condition
      if (genSearch) {
        whereOptions.push(genSearch);
      }
    });
  } else {
    // * advanced search
    Object.entries(filters).forEach(([column, value]) => {
      if (column !== 'search') {
        const columnMetadata = columnsMetadata.find((col) => col.propertyName === column);
        if (!columnMetadata) {
          throw new BadRequestException(`Invalid column: ${column}`);
        }
        // * AND condition
        whereOptions = {
          ...whereOptions,
          ...paginateGenerateWhereCondition(column, value as string, columnMetadata.type as string),
        };
      }
    });
  }

  // * Sorting (orderBy + order)
  if (orderBy) {
    const validColumn = columnsMetadata.some((col) => col.propertyName === orderBy);
    if (!validColumn) {
      throw new BadRequestException(`Invalid orderBy column: ${orderBy}`);
    }
    orderOptions = {
      [orderBy]: order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
    };
  }

  return { whereOptions, orderOptions };
}

function paginateGenerateWhereCondition(
  column: string,
  value: string,
  type: string,
  isGenSearch: boolean = false,
): FindOptionsWhere<any> | null {
  switch (type) {
    case 'varchar':
    case 'text':
    case 'char':
    case 'citext':
    case 'uuid':
      return { [column]: Like(`%${value}%`) };

    case 'int':
    case 'int2':
    case 'int4':
    case 'int8':
    case 'smallint':
    case 'integer':
    case 'bigint':
      return handleNumberSearch(column, value.toString());

    case 'real':
    case 'float4':
    case 'float8':
    case 'double precision':
    case 'decimal':
    case 'numeric':
      return handleNumberSearch(column, value.toString(), false);

    case 'date':
    case 'time':
    case 'timetz':
    case 'timestamp':
    case 'timestamptz':
      return isGenSearch ? null : handleDateSearch(column, value);

    case 'boolean':
      return { [column]: value.toLowerCase() === 'true' };

    default:
      return { [column]: value };
  }
}

function handleNumberSearch(
  column: string,
  value: string,
  isInteger: boolean = true,
): FindOptionsWhere<any> | null {
  if (value.includes(',')) {
    // * Jika value dalam format "10,100" (range)
    const [min, max] = value.split(',').map((v) => Number(v.trim()));
    if (isNaN(min) || isNaN(max)) {
      return null;
    }

    if (isInteger && (!Number.isInteger(min) || !Number.isInteger(max))) {
      return null;
    }

    return { [column]: Between(min, max) };
  } else {
    // * tanpa range
    const numericValue = Number(value);
    console.log('numVal', numericValue);

    if (isNaN(numericValue)) {
      return null;
    }

    if (isInteger && !Number.isInteger(numericValue)) {
      return null;
    }

    return { [column]: numericValue };
  }
}

function handleDateSearch(column: string, value: string): FindOptionsWhere<any> {
  if (value.includes(',')) {
    // * Jika formatnya "YYYY-MM-DD,YYYY-MM-DD" -> Range Search
    const [startDate, endDate] = value.split(',').map((v) => v.trim());
    if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid()) {
      throw new BadRequestException(`Invalid date format. Use YYYY-MM-DD`);
    }
    return { [column]: Between(startDate, endDate) };
  } else {
    // * tanpa range
    if (!dayjs(value).isValid() || !value.includes('-')) {
      throw new BadRequestException(`Invalid date format. Use YYYY-MM-DD`);
    } else {
      console.log('trueeee');
    }
    return { [column]: value };
  }
}
