"use client";

import { ChangePasswordFormValues, UserProfileFormValues } from "@/schema/user.schema";
import { userService } from "@/services/user.service";
import { ChangePasswordResponse, UserProfileResponse } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUserMutation = {
  ChangePasswordMutation: () => {
    return useMutation<
      ChangePasswordResponse,
      AxiosError<ChangePasswordResponse>,
      ChangePasswordFormValues
    >({
      mutationFn: async (data: ChangePasswordFormValues) => {
        const response = await userService.changePassword(data);
        return response;
      },
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Change Password Error:", error);
      },
    });
  },

  UserProfileMutation: () => {
    return useMutation<
      UserProfileResponse,
      AxiosError<UserProfileResponse>,
      UserProfileFormValues
    >({
      mutationFn: async (data: UserProfileFormValues) => {
        const response = await userService.userProfile(data);
        return response;
      },
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("User Profile Error:", error);
      },
    });
  },
};
