import { RoleType } from "../enums/role.enum";

export interface UserCreateRequestDTO {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    role: RoleType;
    isActive: boolean;
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
    isActive?: boolean;
    phone?: string;
    provinceId?: number;
    businessId?: number;
}