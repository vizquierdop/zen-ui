import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { ReservationModel } from "../entities/reservation.models";
import { ReservationStatusType } from "../enums/reservation-status-type.enum";

export interface ReservationGetAllRequestDTO extends UIPaginationBaseRequestModel {
    search?: string;
    customerName?: number;
    customerEmail?: number;
    customerPhone?: number;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    statusTypes?: string; // TODO Implement ReservationStatusType Enum
    serviceIds?: number[];
    businessId?: number;
    userId?: number;
}

export type ReservationGetAllResponseDTO = UIPaginationBaseResponseModel<ReservationModel>;

export interface ReservationCreateRequestDTO {
    date: string;
    startTime: string;
    endTime: string;
    status: ReservationStatusType;
    customerName?: number;
    customerEmail?: string;
    customerPhone?: string;
    userId?: string;
    serviceId: number;
}

export interface ReservationUpdateRequestDTO {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    status: ReservationStatusType;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    userId?: string;
    serviceId: number;
}