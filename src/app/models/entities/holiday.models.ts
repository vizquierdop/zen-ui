import { BusinessShortModel } from "./business.models";

export interface HolidayModel {
    id: number;
    startDate: string; // Date
    endDate: string; // Date

    // Relations
    businessId: number;
    business?: BusinessShortModel;
}