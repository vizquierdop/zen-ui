import { ReservationStatusType } from "../enums/reservation-status-type.enum";
import { OfferedServiceModel } from "./offered-service.models";
import { UserModel } from "./user.models";

export interface ReservationModel {
    id: number;
    date: string; // Date
    startTime: string;
    endTime: string;
    status: ReservationStatusType;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;

    // Relations
    userId?: number;
    user?: UserModel;
    serviceId: number;
    service?: OfferedServiceModel;
}