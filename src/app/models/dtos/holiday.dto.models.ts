export interface HolidayGetAllRequestDTO {
    businessId?: number;
    year?: number;
}

export interface HolidayCreateRequestDTO {
    startDate: string;
    endDate: string;
    businessId: number;
}

export interface HolidayUpdateRequestDTO {
    id: number;
    startDate?: string;
    endDate?: string;
    businessId?: number;
}