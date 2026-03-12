import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { OrderFormValues } from "@/schema/order.schema";
import {
  OrderListResponse,
  CreateOrderResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from "@/types/order.types";

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
    data: UpdateOrderStatusRequest,
    endpoint:
      | typeof API_ENDPOINTS.ORDER.ORDER_CONFIRM
      | typeof API_ENDPOINTS.ORDER.ORDER_CANCEL
      | typeof API_ENDPOINTS.ORDER.ORDER_POSTED,
  ): Promise<UpdateOrderStatusResponse> => {
    const response = await apiClient.post<UpdateOrderStatusResponse>(
      endpoint,
      data,
    );
    return response.data;
  },
};
