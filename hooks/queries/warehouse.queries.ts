import { QUERY_KEYS } from "@/lib/constants";
import { warehouseService } from "@/services/warehouse.service";
import { useQuery } from "@tanstack/react-query";

interface WarehouseListQueryProps {
  user_id: number | null;
  acno: string | null;
}

export const useWarehouseQuery = {
  WarehouseListQuery: (data: WarehouseListQueryProps) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.WAREHOUSE.WAREHOUSE_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => warehouseService.warehouseList(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
