import { User } from "@/types/auth.types";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { STORAGE_KEYS } from "@/lib/constants";

interface AuthState {
  user: User | null;
  signin: (userData: User) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    const val = Cookies.get(name);
    if (!val) return null;
    return atob(val);
  },
  setItem: (name: string, value: string) => {
    const base64Value = btoa(value);
    Cookies.set(name, base64Value, { expires: 1 });
  },
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

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
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
