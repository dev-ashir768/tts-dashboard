import { User } from "@/types/auth.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { STORAGE_KEYS } from "@/lib/constants";

interface AuthState {
  user: User | null;
  signin: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      signin: (userData) => {
        set({
          user: userData,
        });
        Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, userData.api_key);
      },

      logout: () => {
        Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
        set({
          user: null,
        });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_STATE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
