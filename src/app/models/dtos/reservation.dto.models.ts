import { PaginationBaseRequestModel, PaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { ReservationModel } from "../entities/reservation.models";

export interface ReservationGetAllRequestDTO extends PaginationBaseRequestModel {
    search?: string;
    customerName?: number;
    customerEmail?: number;
    customerPhone?: number;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    status?: number; // TODO Implement ReservationStatusType Enum
    serviceIds?: number[];
}

export type ReservationGetAllResponseDTO = PaginationBaseResponseModel<ReservationModel>;

export interface ReservationCreateRequestDTO {
    date: string;
    startTime: string;
    endTime: string;
    status: number; // TODO Implement ReservationStatusType Enum
    customerName?: number;
    customerEmail?: string;
    customerPhone?: string;
    customerId?: string;
    serviceId: number;
}

export interface ReservationUpdateRequestDTO {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    status: number; // TODO Implement ReservationStatusType Enum
    customerName?: number;
    customerEmail?: string;
    customerPhone?: string;
    customerId?: string;
    serviceId: number;
}