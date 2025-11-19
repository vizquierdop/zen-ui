import { PaginationBaseRequestModel, PaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { ProvinceModel } from "../entities/province.models";

export interface ProvinceGetAllRequestDTO extends PaginationBaseRequestModel {
    name?: string;
}

export type ProvinceGetAllResponseDTO = PaginationBaseResponseModel<ProvinceModel>;

export interface ProvinceCreateRequestDTO {
    name: string;
}

export interface ProvinceUpdateRequestDTO {
    id: number;
    name: string;
}