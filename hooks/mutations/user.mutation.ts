"use client";

import { ChangePasswordFormValues } from "@/schema/user.schema";
import { userService } from "@/services/user.servce";
import { ChangePasswordResponse } from "@/types/user.types";
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
        return response.data;
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
};
