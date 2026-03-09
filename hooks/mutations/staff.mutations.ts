"use client";

import { StaffFormValues } from "@/schema/staff.schema";
import { staffService, staffStatusUpdateProps } from "@/services/staff.service";
import {
  CreateStaffResponse,
  StaffStatusUpdateResponse,
} from "@/types/staff.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants";

export const useStaffMutation = {
  StaffStatusUpdateMutation: () => {
    const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.DASHBOARD.INDEX],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.STAFF.STAFF_LIST],
        });
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Staff Status Update Error:", error);
      },
    });
  },

  CreateStaffMutation: () => {
    const queryClient = useQueryClient();
    return useMutation<
      CreateStaffResponse,
      AxiosError<CreateStaffResponse>,
      StaffFormValues
    >({
      mutationFn: async (data: StaffFormValues) => {
        const response = await staffService.createStaff(data);
        return response;
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.DASHBOARD.INDEX],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.STAFF.STAFF_LIST],
        });
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Create Staff Error:", error);
      },
    });
  },
};
