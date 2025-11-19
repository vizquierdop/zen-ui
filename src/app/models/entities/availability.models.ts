import { BusinessShortModel } from "./business.models";

export interface AvailabilityModel {
    id: number;
    dayOfWeek: number;
    slot1Start: string;
    slot1End: string;
    slot2Start?: string;
    slot2End?: string;

    // Relations
    businessId: number;
    business: BusinessShortModel;
}