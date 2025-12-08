import { RoleType } from "../enums/role.enum";
import { BusinessCreateRequestDTO } from "./business.dto.models";

export interface UserCreateRequestDTO {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    role: RoleType;
    isActive: boolean;
    provinceId: number;
    business?: BusinessCreateRequestDTO;
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

export interface UserLoginRequestDTO {
    email: string;
    password: string;
}

export interface UserLoginResponseDTO {
  accessToken: string;
  accessTokenExpiresAt: string; // Date
  refreshToken: string;
  refreshTokenExpiresAt: string; // Date
  userId: number;
  email: string;
  role: RoleType;
}