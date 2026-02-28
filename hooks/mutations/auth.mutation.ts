"use client";

import { PROTECTED_ROUTES } from "@/lib/constants";
import { LoginFormValues } from "@/schema/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { LoginResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuthMutation = {
  LoginMutation: () => {
    const router = useRouter();
    const { login: setGlobalUser } = useAuthStore();

    return useMutation<
      LoginResponse,
      AxiosError<LoginResponse>,
      LoginFormValues
    >({
      mutationFn: async (data: LoginFormValues) => {
        const response = await authService.login(data);
        return response.data;
      },
      onSuccess: (response) => {
        const userData = response.payload;
        if (!userData) {
          toast.error("Error: No user data received");
          return;
        }
        setGlobalUser(userData);
        router.push(PROTECTED_ROUTES.DASHBOARD.HOME);
        toast.success(`Welcome Back, ${userData.full_name.toUpperCase()}`);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Login Error:", error);
      },
    });
  },
};
