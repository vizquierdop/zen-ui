import { AvailabilityModel } from "./availability.models";
import { CategoryModel } from "./category.models";
import { OfferedServiceModel } from "./offered-service.models";
import { ProvinceModel } from "./province.models";
import { UserModel, UserShortModel } from "./user.models";
import { HolidayModel } from "./holiday.models";

export interface BusinessModel {
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
    isActive?: boolean;

    // Relations
    provinceId: number;
    province: ProvinceModel;
    categories: CategoryModel[];
    userId: number;
    user?: UserShortModel;
    services: OfferedServiceModel[];
    vacations: HolidayModel[];
    availabilities: AvailabilityModel[];
}

export interface BusinessShortModel {
    id: number;
    name: string;
}