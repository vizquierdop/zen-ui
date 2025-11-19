export interface UIPaginationBaseRequestModel {
    paginationSkip?: number;
    paginationLength?: number;
    orderBy?: string;
    orderDirection?: number;
}

export interface UIPaginationBaseResponseModel<T> {
    items: T[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}