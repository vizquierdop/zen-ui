import { UIPaginationBaseRequestModel, UIPaginationBaseResponseModel } from "../basic/ui-pagination.models";
import { AvailabilityModel } from "../entities/availability.models";
import { CategoryModel } from "../entities/category.models";
import { HolidayModel } from "../entities/holiday.models";
import { OfferedServiceModel } from "../entities/offered-service.models";
import { ProvinceModel } from "../entities/province.models";
import { UserShortModel } from "../entities/user.models";

export interface BusinessGetAllRequestDTO extends UIPaginationBaseRequestModel {
    categoryIds?: string;
    name?: string;
    isActive: boolean;
}

export type BusinessGetAllResponseDTO = UIPaginationBaseResponseModel<BusinessGetSingleResponseDTO>;

export interface BusinessGetSingleResponseDTO {
    id: number;
    name: string;
    description?: string;
    address: string;
    photo?: string;
    keyword1?: string;
    keyword2?: string;
    keyword3?: string;
    phone: string;
    simultaneousBookings: number;
    instagramUser?: string;
    xUser?: string;
    tikTokUser?: string;
    facebookUser?: string;
    googleMaps: string;
    isActive: boolean;
    provinceId: number;
    province: ProvinceModel;
    userId: number;
    user: UserShortModel;
    availabilities: AvailabilityModel[];
    offeredServices: OfferedServiceModel[];
    holidays: HolidayModel[];
    categories: CategoryModel[];
}

export interface BusinessUpdateRequestDTO {
    id: number;
    name?: string;
    description?: string;
    address?: string;
    photo?: string;
    keyword1?: string;
    keyword2?: string;
    keyword3?: string;
    phone: string;
    simultaneousBookings?: number;
    instagramUser?: string;
    xUser?: string;
    tikTokUser?: string;
    facebookUser?: string;
    googleMaps?: string;
    provinceId?: number;
    userId?: number;
}

export interface BusinessCreateRequestDTO {
    name: string;
    address: string;
    keyword1?: string;
    keyword2?: string;
    keyword3?: string;
    provinceId: number;
    isActive: boolean;
    simultaneousBookings: number;
    categoryIds: number[];
}