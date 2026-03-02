"use client";

import { customerService, customerStatusUpdateProps } from "@/services/customer.service";
import { CustomerStatusUpdateResponse } from "@/types/customer.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCustomerMutation = {
  CustomerStatusUpdateMutation: () => {
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
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
        console.error("Customer Status Update Error:", error);
      },
    });
  },
};
