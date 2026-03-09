import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { OrderFormValues } from "@/schema/order.schema";
import { OrderListResponse, CreateOrderResponse } from "@/types/order.types";

interface orderListProps {
  user_id: number | null;
  acno: string | null;
}

export const orderService = {
  orderList: async (data: orderListProps): Promise<OrderListResponse> => {
    const response = await apiClient.post<OrderListResponse>(
      API_ENDPOINTS.ORDER.ORDER_LIST,
      data,
    );
    return response.data;
  },
  createOrder: async (data: OrderFormValues): Promise<CreateOrderResponse> => {
    const response = await apiClient.post<CreateOrderResponse>(
      API_ENDPOINTS.ORDER.CREATE_ORDER,
      data,
    );
    return response.data;
  },
  updateOrderStatus: async (
    data: import("@/types/order.types").UpdateOrderStatusRequest,
  ): Promise<import("@/types/order.types").UpdateOrderStatusResponse> => {
    const response = await apiClient.post<
      import("@/types/order.types").UpdateOrderStatusResponse
    >(API_ENDPOINTS.ORDER.ORDER_STATUS_UPDATE, data);
    return response.data;
  },
};
