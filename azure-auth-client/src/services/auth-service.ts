import { api } from "@/lib/api";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export async function validateToken(): Promise<AuthUser> {
    const response = await api.get<AuthUser>("/auth/whoami");
    return response.data;
}
