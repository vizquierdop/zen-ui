import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { ProvinceModel } from "../entities/province.models";

export interface ProvinceGetAllRequestDTO extends UIPaginationBaseRequestModel {
    name?: string;
}

export type ProvinceGetAllResponseDTO = UIPaginationBaseResponseModel<ProvinceModel>;

export interface ProvinceCreateRequestDTO {
    name: string;
}

export interface ProvinceUpdateRequestDTO {
    id: number;
    name: string;
}