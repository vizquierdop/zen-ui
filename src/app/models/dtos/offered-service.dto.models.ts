import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { OfferedServiceModel } from "../entities/offered-service.models";

export interface OfferedServiceGetAllRequestDTO extends UIPaginationBaseRequestModel {
    search?: string;
    name?: string;
    duration?: number;
    price?: number;
    isActive?: boolean;
    businessId?: number;
    provinceId?: number;
}

export type OfferedServiceGetAllResponseDTO = UIPaginationBaseResponseModel<OfferedServiceModel>;

export interface OfferedServiceCreateRequestDTO {
    name: string;
    description?: string;
    duration?: number;
    price: number;
    isActive: boolean;
    businessId: number;
}

export interface OfferedServiceUpdateRequestDTO {
    id: number;
    name?: string;
    description?: string;
    duration?: number;
    price?: number;
    isActive?: boolean;
    businessId?: number;
}