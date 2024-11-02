import { IsNumber, IsOptional } from 'class-validator';
export class QueryPaginationDTO {
    @IsOptional()
    @IsNumber()
    page: number = 1;
    @IsOptional()
    @IsNumber()
    perPage: number = 10;
    @IsOptional()
    sortBy?: string;
    @IsOptional()
    searchTerm?: string;
}
export interface QueryPaginationResponse<T> {
    data: T[];
    total: number;   
}
