export interface BusinessUpdateRequestDTO {
    id: number;
    name?: string;
    description?: string;
    address?: string;
    photo?: string;
    keyword1?: string;
    keyword2?: string;
    keyword3?: string;
    phone: string;
    simultaneousBookings?: number;
    instagramUser?: string;
    xUser?: string;
    tikTokUser?: string;
    facebookUser?: string;
    googleMaps?: string;
    provinceId?: number;
    userId?: number;
}