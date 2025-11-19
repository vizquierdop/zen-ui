export interface PaginationBaseRequestModel {
    paginationSkip?: number;
    paginationLength?: number;
    orderBy?: string;
    orderDirection?: number;
}

export interface PaginationBaseResponseModel<T> {
    items: T[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}