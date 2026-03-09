import { OrderFormValues } from "@/schema/order.schema";
import { orderService } from "@/services/order.service";
import { ApiErrorResponse } from "@/types/general.types";
import {
  CreateOrderResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from "@/types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants";

export const useOrderMutation = {
  CreateOrderMutation: () => {
    const queryClient = useQueryClient();
    return useMutation<
      CreateOrderResponse,
      AxiosError<ApiErrorResponse>,
      OrderFormValues
    >({
      mutationFn: async (data) => {
        return orderService.createOrder(data);
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.DASHBOARD.INDEX],
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER.ORDER_LIST] });
        toast.success(response.message);
      },
      onError: (error) => {
        const errorMessages = error.response?.data?.payload.map(
          (error) => error.message,
        );
        toast.error(
          errorMessages?.length
            ? errorMessages.join(", ")
            : error.response?.data?.message,
        );
        console.error("Order Creation Error:", error);
      },
    });
  },
  UpdateOrderStatusMutation: () => {
    const queryClient = useQueryClient();
    return useMutation<
      UpdateOrderStatusResponse,
      AxiosError<ApiErrorResponse>,
      UpdateOrderStatusRequest
    >({
      mutationFn: async (data) => {
        return orderService.updateOrderStatus(data);
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.DASHBOARD.INDEX],
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER.ORDER_LIST] });
        toast.success(response.message);
      },
      onError: (error) => {
        const errorMessages = error.response?.data?.payload.map(
          (error) => error.message,
        );
        toast.error(
          errorMessages?.length
            ? errorMessages.join(", ")
            : error.response?.data?.message,
        );
        console.error("Order Status Update Error:", error);
      },
    });
  },
};
