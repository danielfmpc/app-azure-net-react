import { api } from "@/lib/api";


interface StatusService {
    errorCoded: number;
    failureReason: string;
};

interface LocationService {
    city: string;
    countryorRegion: string;
};

export interface SignInService {
    id: string;
    userPrincipalName: string;
    appDisplayName: string;
    createdDateTime: Date;
    Status: StatusService;
    ipAddress: string;
    clientAppUsed: string;
    Location: LocationService;
}

export async function getAuditLogsSignIns(): Promise<SignInService[]> {
    const response = await api.get<SignInService[]>("/auditLogs/signIns");
    return response.data;
}

interface UserService {
    id: string;
    displayName: string;
    userPrincipalName: string;
};

interface InitiatedByService {
    user: UserService;
};

export interface DirectoryAuditService {
    id: string,
    category: string,
    correlationId: string,
    result: string,
    activityDisplayName: string,
    activityDateTime: Date,
    loggedByService: string,
    operationType: string,
    initiatedBy: InitiatedByService;
}

export async function getAuditLogsDirectoryAudits(): Promise<DirectoryAuditService[]> {
    const response = await api.get<DirectoryAuditService[]>("/auditLogs/directoryAudits");
    return response.data;
}

interface ProvisionStatusService {
    status: string;
};

interface App {
    displayName: string,
    appId: string
}

interface ProvisioningInitiatedBy {
    app: App;
}

export interface ProvisioningService {
    id: string
    activityDateTime: Date,
    changeId: string,
    cycleId: string,
    provisioningAction: string,
    initiatedBy: ProvisioningInitiatedBy
    status: ProvisionStatusService

}

export async function getAuditLogsProvisioning(): Promise<ProvisioningService[]> {
    const response = await api.get<ProvisioningService[]>("/auditLogs/provisioning");
    return response.data;
}

