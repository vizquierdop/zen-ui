export interface VacationGetAllRequestDTO {
    businessId?: number;
    year?: number;
}

export interface VacationCreateRequestDTO {
    startDate: string;
    endDate: string;
    businessId: number;
}

export interface VacationUpdateRequestDTO {
    id: number;
    startDate?: string;
    endDate?: string;
    businessId?: number;
}