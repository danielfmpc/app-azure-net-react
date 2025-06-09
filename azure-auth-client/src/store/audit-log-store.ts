import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { DirectoryAuditService, ProvisioningService, SignInService } from "@/services/audit-log-service";
import { getAuditLogsSignIns, getAuditLogsDirectoryAudits, getAuditLogsProvisioning } from "@/services/audit-log-service";

const INITIAL_STATE_SIGN: SignInService = {
    id: "",
    userPrincipalName: "",
    appDisplayName: "",
    createdDateTime: new Date(),
    Status: {
        errorCoded: 0,
        failureReason: "",
    },
    ipAddress: "",
    clientAppUsed: "",
    Location: {
        city: "",
        countryorRegion: "",
    }
}

const INITIAL_STATE_DIRECTORY: DirectoryAuditService = {
    id: "",
    activityDisplayName: "",
    loggedByService: "",
    operationType: "",
    result: "",
    category: "",
    correlationId: "",
    initiatedBy: {
        user: {
            id: "",
            displayName: "",
            userPrincipalName: "",
        },
    },
    activityDateTime: new Date(),


}

const INITIAL_STATE_PROVISIONING: ProvisioningService = {
    id: "",
    activityDateTime: new Date(),
    status: {
        status: "",
    },
    changeId: "",
    cycleId: "",
    provisioningAction: "",
    initiatedBy: {
        app: {
            displayName: "",
            appId: "",
        },
    },
}

interface AuditLogsStore {
    auditLogSignIns: SignInService[];
    directoryAudits: DirectoryAuditService[];
    auditProvisioning: ProvisioningService[];
    isLoading: boolean;
    setAuditLoginIns: () => Promise<void>;
    setDirectoryAudits: () => Promise<void>;
    setAuditProvisioning: () => Promise<void>;
}
let _setAuditLoginIns: (() => Promise<void>) | null = null;
let _setDirectoryAudits: (() => Promise<void>) | null = null;
let _setAuditProvisioning: (() => Promise<void>) | null = null;

export const useAuditLogStore = create<AuditLogsStore>()(
    immer((set) => {
        if (!_setAuditLoginIns) {
            _setAuditLoginIns = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const auditLogSignIns = await getAuditLogsSignIns();

                    set((state) => {
                        state.auditLogSignIns = auditLogSignIns;
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Error setUsers", error);
                    set((state) => {
                        state.auditLogSignIns = [{ ...INITIAL_STATE_SIGN }];
                        state.isLoading = false;
                    });
                }
            };
        }

        if (!_setDirectoryAudits) {
            _setDirectoryAudits = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const directoryAudits = await getAuditLogsDirectoryAudits();

                    set((state) => {
                        state.directoryAudits = directoryAudits;
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Error setUsers", error);
                    set((state) => {
                        state.directoryAudits = [{ ...INITIAL_STATE_DIRECTORY }];
                        state.isLoading = false;
                    });
                }
            };
        }

        if (!_setAuditProvisioning) {
            _setAuditProvisioning = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const auditProvisioning = await getAuditLogsProvisioning();

                    set((state) => {
                        state.auditProvisioning = auditProvisioning;
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Error setUsers", error);
                    set((state) => {
                        state.auditProvisioning = [{ ...INITIAL_STATE_PROVISIONING }];
                        state.isLoading = false;
                    });
                }
            };
        }


        return {
            auditLogSignIns: [{ ...INITIAL_STATE_SIGN }],
            directoryAudits: [{ ...INITIAL_STATE_DIRECTORY }],
            auditProvisioning: [{ ...INITIAL_STATE_PROVISIONING }],
            isLoading: false,
            setAuditLoginIns: _setAuditLoginIns,
            setDirectoryAudits: _setDirectoryAudits,
            setAuditProvisioning: _setAuditProvisioning,
        };
    })
);