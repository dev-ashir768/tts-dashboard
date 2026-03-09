"use client";

import {
  customerService,
  customerStatusUpdateProps,
} from "@/services/customer.service";
import { CustomerStatusUpdateResponse } from "@/types/customer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants";

export const useCustomerMutation = {
  CustomerStatusUpdateMutation: () => {
    const queryClient = useQueryClient();
    return useMutation<
      CustomerStatusUpdateResponse,
      AxiosError<CustomerStatusUpdateResponse>,
      customerStatusUpdateProps
    >({
      mutationFn: async (data: customerStatusUpdateProps) => {
        const response = await customerService.customerStatusUpdate(data);
        return response;
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.DASHBOARD.INDEX],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.CUSTOMER.CUSTOMER_LIST],
        });
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Customer Status Update Error:", error);
      },
    });
  },
};
