import { BusinessShortModel } from "./business.models";

export interface VacationModel {
    id: number;
    startDate: string; // Date
    endDate: string; // Date

    // Relations
    businessId: number;
    business: BusinessShortModel;
}