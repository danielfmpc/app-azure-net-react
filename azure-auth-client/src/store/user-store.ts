import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type UserService, getInfoMe } from "@/services/user-service";

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

interface UserStore {
    user: UserService;
    isLoading: boolean;
    setUser: () => Promise<void>;
}

let _setUser: (() => Promise<void>) | null = null;

export const useUserStore = create<UserStore>()(
    immer((set) => {
        if (!_setUser) {
            _setUser = async () => {
                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const user = await getInfoMe();

                    set((state) => {
                        state.user = user;
                        state.isLoading = false;
                    });
                } catch (error) {
                    console.error("Token inválido ou expirado", error);
                    set((state) => {
                        state.user = { ...INITIAL_STATE };
                        state.isLoading = false;
                    });
                }
            };
        }

        return {
            user: { ...INITIAL_STATE },
            isLoading: false,
            setUser: () => _setUser!(),
        };
    })
)