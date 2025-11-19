import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { CategoryModel } from "../entities/category.models";

export interface CategoryGetallRequestDTO extends UIPaginationBaseRequestModel {
    name?: string;
}

export type CategoryGetAllResponseDTO = UIPaginationBaseResponseModel<CategoryModel>;

export interface CategoryCreateRequestDTO {
    name: string;
}

export interface CategoryUpdateRequestDTO {
    id: number;
    name: string;
}