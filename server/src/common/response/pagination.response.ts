import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse<T = any> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  orderBy: string | null;

  @ApiProperty()
  order: string;

  @ApiProperty({ type: () => Object, isArray: true })
  listData: T[];
}
