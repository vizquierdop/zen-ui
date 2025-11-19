import { PaginationBaseRequestModel, PaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { CategoryModel } from "../entities/category.models";

export interface CategoryGetallRequestDTO extends PaginationBaseRequestModel {
    name?: string;
}

export type CategoryGetAllResponseDTO = PaginationBaseResponseModel<CategoryModel>;

export interface CategoryCreateRequestDTO {
    name: string;
}

export interface CategoryUpdateRequestDTO {
    id: number;
    name: string;
}