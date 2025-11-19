import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { OfferedServiceModel } from "../entities/offered-service.models";

export interface OfferedServiceGetAllRequestDTO extends UIPaginationBaseRequestModel {
    search?: string;
    name?: string;
    duration?: number;
    price?: number;
    active?: boolean;
}

export type OfferedServiceGetAllResponseDTO = UIPaginationBaseResponseModel<OfferedServiceModel>;

export interface OfferedServiceCreateRequestDTO {
    name: string;
    description?: string;
    duration?: number;
    price: number;
    active: boolean;
    businessId: number;
}

export interface OfferedServiceUpdateRequestDTO {
    id: number;
    name?: string;
    description?: string;
    duration?: number;
    price?: number;
    active?: boolean;
    businessId?: number;
}