import { api } from "@/lib/api";

type PhotoService = {
    id: string;
    photo: string;
    height: string;
    width: string;
};

export interface UserService {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
    mail: string;
    jobTitle: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    businessPhones: string[];
    photo: PhotoService;
}

export async function getInfoMe(): Promise<UserService> {
    const response = await api.get<UserService>("/me");
    return response.data;
}
