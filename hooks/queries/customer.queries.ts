import { QUERY_KEYS } from "@/lib/constants";
import { customerService } from "@/services/customer.service";
import { useQuery } from "@tanstack/react-query";

interface CustomerListQueryProps {
  user_id: number | null;
  acno: string | null;
}

export const useCustomerQuery = {
  CustomerListQuery: (data: CustomerListQueryProps) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.CUSTOMER.CUSTOMER_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => customerService.customerList(),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
