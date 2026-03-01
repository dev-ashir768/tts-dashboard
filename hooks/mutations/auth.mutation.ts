"use client";

import { PROTECTED_ROUTES } from "@/lib/constants";
import { SigninFormValues, SignupFormValues } from "@/schema/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { SigninResponse, SignupResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuthMutation = {
  SigninMutation: () => {
    const router = useRouter();
    const { signin: setGlobalUser } = useAuthStore();

    return useMutation<
      SigninResponse,
      AxiosError<SigninResponse>,
      SigninFormValues
    >({
      mutationFn: async (data: SigninFormValues) => {
        const response = await authService.signin(data);
        return response.data;
      },
      onSuccess: (response) => {
        const userData = response.payload;
        if (!userData) {
          toast.error("Error: No user data received");
          return;
        }
        setGlobalUser(userData[0]);
        router.push(PROTECTED_ROUTES.DASHBOARD.HOME);
        toast.success(`Welcome Back, ${userData[0].full_name?.toUpperCase()}`);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Signin Error:", error);
      },
    });
  },

  SignupMutation: () => {
    return useMutation<
      SignupResponse,
      AxiosError<SignupResponse>,
      SignupFormValues
    >({
      mutationFn: async (data: SignupFormValues) => {
        const response = await authService.signup(data);
        return response.data;
      },
      onSuccess: (response) => {
        // router.push(PROTECTED_ROUTES.DASHBOARD.HOME);
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Signup Error:", error);
      },
    });
  },
};
