import { api } from "@/lib/api";
import type { UserService } from "./user-service";

export interface GroupsService {
    id: string;
    displayName: string;
    description: string;
    mail: string;
    createdDateTime: Date;
}

export async function getGroups(): Promise<GroupsService[]> {
    const response = await api.get<GroupsService[]>("/groups");
    return response.data;
}

export async function getGroupsMember(groupId: string): Promise<UserService[]> {
    const response = await api.get<UserService[]>(`/groups/${groupId}/members`);
    return response.data;
}

