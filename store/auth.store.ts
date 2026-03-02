import { User } from "@/types/auth.types";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { STORAGE_KEYS } from "@/lib/constants";

interface AuthState {
  user: User | null;
  signin: (userData: User) => void;
  logout: () => void;
}

const cookieStorage: StateStorage = {
  getItem: (name: string) => Cookies.get(name) ?? null,
  setItem: (name: string, value: string) =>
    Cookies.set(name, value, { expires: 1 }),
  removeItem: (name: string) => Cookies.remove(name),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      signin: (userData) => {
        set({
          user: userData,
        });
      },

      logout: () => {
        set({
          user: null,
        });
        Cookies.remove(STORAGE_KEYS.AUTH_STATE);
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_STATE,
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
