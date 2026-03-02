"use client";

import { staffService, staffStatusUpdateProps } from "@/services/staff.service";
import { StaffStatusUpdateResponse } from "@/types/staff.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useStaffMutation = {
  StaffStatusUpdateMutation: () => {
    return useMutation<
      StaffStatusUpdateResponse,
      AxiosError<StaffStatusUpdateResponse>,
      staffStatusUpdateProps
    >({
      mutationFn: async (data: staffStatusUpdateProps) => {
        const response = await staffService.staffStatusUpdate(data);
        return response;
      },
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Staff Status Update Error:", error);
      },
    });
  },
};
