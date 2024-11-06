import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsNumberString, IsOptional } from 'class-validator';
export class QueryPaginationDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 0;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage: number = 5;
  @IsOptional()
  sortBy?: string;
  @IsOptional()
  searchTerm?: string;
}
export interface QueryPaginationResponse<T> {
  data: T[];
  total: number;
}
