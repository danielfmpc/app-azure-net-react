import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type UserService } from "@/services/user-service";
import { getUsers, getSearchUsers } from "@/services/users-service";

const INITIAL_STATE: UserService = {
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

interface UsersStore {
    userId: string;
    users: UserService[];
    filteredUsers: UserService;
    isLoading: boolean;
    setUsers: () => Promise<void>;
    setUserId: (userId: string) => void;
    setSearchUsers: (userId: string) => Promise<void>;
}
let _setUsers: (() => Promise<void>) | null = null;
let _setSearchUsers: ((userId: string) => Promise<void>) | null = null;

export const useUsersStore = create<UsersStore>()(
    immer((set, get) => {
        if (!_setUsers) {
            _setUsers = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const users = await getUsers();

                    set((state) => {
                        state.users = users;
                        state.userId = "";
                        state.filteredUsers = { ...INITIAL_STATE };
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Error setUsers", error);
                    set((state) => {
                        state.userId = "";
                        state.users = [{ ...INITIAL_STATE }];
                        state.filteredUsers = { ...INITIAL_STATE };
                        state.isLoading = false;
                    });
                }
            };
        }

        if (!_setSearchUsers) {
            _setSearchUsers = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const filtered = await getSearchUsers(get().userId);

                    set((state) => {
                        state.users = [{ ...INITIAL_STATE }];
                        state.filteredUsers = filtered;
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Erro setSearchUsers", error);
                    set((state) => {
                        state.users = [{ ...INITIAL_STATE }];
                        state.filteredUsers = { ...INITIAL_STATE };
                        state.isLoading = false;
                    });
                }
            };
        }

        const setUserId = (userId: string) => {
            set((state) => {
                state.userId = userId;
            });
        };

        return {
            userId: "",
            users: [{ ...INITIAL_STATE }],
            filteredUsers: { ...INITIAL_STATE },
            isLoading: false,
            setUsers: _setUsers,
            setSearchUsers: _setSearchUsers,
            setUserId: setUserId
        };
    })
);