export interface AvailabilityCreateRequestDTO {
    businessId: number;
    availabilities: AvailabilityCreateSingleDTO[];
}

export interface AvailabilityCreateSingleDTO {
    dayOfWeek: number;
    slot1Start: string;
    slot1End: string;
    slot2Start?: string;
    slot2End?: string;
    active: boolean;
}

export interface AvailabilityUpdateRequestDTO {
    businessId: number;
    availabilities: AvailabilityUpdateSingleDTO[];
}

export interface AvailabilityUpdateSingleDTO {
    id: number;
    dayOfWeek: number;
    slot1Start: string;
    slot1End: string;
    slot2Start?: string;
    slot2End?: string;
    active: boolean;
}

