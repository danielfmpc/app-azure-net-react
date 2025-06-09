// src/store/auth-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { validateToken, type AuthUser } from "@/services/auth-service";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  user: AuthUser | null;
  validateToken: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      isHydrated: false,
  
      validateToken: async () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          set((state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = false;
          });
          return;
        }

        set({ isLoading: true });
        try {
          const user = await validateToken();
          set((state) => {
            state.isAuthenticated = true;
            state.user = user;
            state.isLoading = false;
          });
        } catch(error) {
          console.error("Token inválido ou expirado", error);
          set((state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = false;
          });
        } finally {
          set({ isLoading: false });
        }
      },
  
      logout: () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_storage"); 
        set((state) => {
          state.isAuthenticated = false;
          state.isLoading = false;
          state.user = null;
        });
      },
    })),
    {
      name: "auth_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => {
        return (_, error) => {
          if (!error) {
            setTimeout(() => {
              useAuthStore.setState({ isHydrated: true });
            }, 0); // garantir que ocorra no próximo tick
          }
        };
      }
    }
  )
);
