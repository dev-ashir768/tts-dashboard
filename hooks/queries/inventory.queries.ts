import { QUERY_KEYS } from "@/lib/constants";
import { inventoryService, InventoryListProps } from "@/services/inventory.service";
import { useQuery } from "@tanstack/react-query";

export const useInventoryQuery = {
  InventoryListQuery: (data: InventoryListProps) => {

    return useQuery({
      queryKey: [
        QUERY_KEYS.INVENTORY.INVENTORY_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => inventoryService.inventoryList(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
