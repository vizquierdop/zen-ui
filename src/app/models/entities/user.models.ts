import { RoleType } from "../enums/role.enum";
import { BusinessModel } from "./business.models";
import { ProvinceModel } from "./province.models";

export interface UserModel {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    role: RoleType;
    isActive: boolean;
    phone?: string;

    // Relations
    provinceId: number;
    province: ProvinceModel;
    businessId?: number;
    business?: BusinessModel;
}

export interface UserShortModel {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: RoleType;
    isActive: boolean;
}