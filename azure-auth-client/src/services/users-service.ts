import { api } from "@/lib/api";
import type { UserService } from "./user-service";


export async function getUsers(): Promise<UserService[]> {
    const response = await api.get<UserService[]>("/users");
    return response.data;
}

export async function getSearchUsers(userId: string): Promise<UserService> {
    const response = await api.get<UserService>(`/users/${userId}`);
    return response.data;
}
