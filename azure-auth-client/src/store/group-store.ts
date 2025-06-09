import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type GroupsService } from "@/services/group-service";
import { getGroups, getGroupsMember } from "@/services/group-service";
import type { UserService } from "@/services/user-service";

const INITIAL_STATE: GroupsService = {
    id: "",
    displayName: "",
    description: "",
    mail: "",
    createdDateTime: new Date(),
}

const INITIAL_STATE_USER: UserService = {
    id: "",
    displayName: "",
    givenName: "",
    surname: "",
    userPrincipalName: "",
    mail: "",
    jobTitle: "",
    mobilePhone: "",
    officeLocation: "",
    preferredLanguage: "",
    businessPhones: [],
    photo: {
        height: "",
        id: "",
        photo: "",
        width: "",
    },
}

interface GroupsStore {
    groupId: string;
    groups: GroupsService[];
    groupMembers: UserService[];
    isLoading: boolean;
    setGroups: () => Promise<void>;
    setGroupId: (groupId: string) => void;
    setGroupMembers: (groupId: string) => Promise<void>;
}
let _setgroups: (() => Promise<void>) | null = null;
let _setGroupMembers: ((groupId: string) => Promise<void>) | null = null;

export const useGroupsStore = create<GroupsStore>()(
    immer((set, get) => {
        if (!_setgroups) {
            _setgroups = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const groups = await getGroups();

                    set((state) => {
                        state.groups = groups;
                        state.groupId = "";
                        state.groupMembers = [{ ...INITIAL_STATE_USER }];
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Error setUsers", error);
                    set((state) => {
                        state.groupId = "";
                        state.groups = [{ ...INITIAL_STATE }];
                        state.groupMembers = [{ ...INITIAL_STATE_USER }];
                        state.isLoading = false;
                    });
                }
            };
        }

        if (!_setGroupMembers) {
            _setGroupMembers = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const filtered = await getGroupsMember(get().groupId);

                    console.log(filtered)

                    set((state) => {
                        state.groups = [{ ...INITIAL_STATE }];
                        state.groupMembers = filtered;
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Erro setSearchUsers", error);
                    set((state) => {
                        state.groups = [{ ...INITIAL_STATE }];
                        state.groupMembers = [{ ...INITIAL_STATE_USER }];
                        state.isLoading = false;
                    });
                }
            };
        }

        const setUserId = (groupId: string) => {
            set((state) => {
                state.groupId = groupId;
            });
        };

        return {
            groupId: "",
            groups: [{ ...INITIAL_STATE }],
            groupMembers: [{ ...INITIAL_STATE_USER }],
            isLoading: false,
            setGroups: _setgroups,
            setGroupMembers: _setGroupMembers,
            setGroupId: setUserId
        };
    })
);