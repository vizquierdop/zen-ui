import { BusinessModel } from "./business.models";

export interface OfferedServiceModel {
    id: number;
    name: string;
    description?: string;
    duration?: number;
    price: number;
    active: boolean;

    // Realtions
    businessId: number;
    business?: BusinessModel;
}