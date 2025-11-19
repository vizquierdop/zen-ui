import { RoleType } from "../enums/role.enum";

export interface UserCreateRequestDTO {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    role: RoleType;
    active: boolean;
    provinceId: number;
    businessId?: number;
}

export interface UserUpdateRequestDTO {
    id: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: RoleType;
    active?: boolean;
    provinceId?: number;
    businessId?: number;
}