import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { HolidayModel } from "../entities/holiday.models";

export interface HolidayGetAllRequestDTO extends UIPaginationBaseRequestModel {
    businessId?: number;
    startDate?: string; // Date
    endDate?: string; // Date
}

export type HolidayGetAllResponseDTO = UIPaginationBaseResponseModel<HolidayModel>;

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