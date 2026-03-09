import { QUERY_KEYS } from "@/lib/constants";
import { orderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

interface OrderListQueryProps {
  user_id: number | null;
  acno: string | null;
}

export const useOrderQuery = {
  OrderListQuery: (data: OrderListQueryProps) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.ORDER.ORDER_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => orderService.orderList(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
