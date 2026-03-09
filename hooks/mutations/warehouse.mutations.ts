import { WarehouseFormValues } from "@/schema/warehouse.schema";
import { warehouseService } from "@/services/warehouse.service";
import { ApiErrorResponse } from "@/types/general.types";
import { CreateWarehouseResponse } from "@/types/warehouse.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useWarehouseMutation = {
  CreateWarehouseMutation: () => {
    return useMutation<
      CreateWarehouseResponse,
      AxiosError<ApiErrorResponse>,
      WarehouseFormValues
    >({
      mutationFn: async (data) => {
        return warehouseService.createWarehouse(data);
      },
      onSuccess: (response) => {
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
        console.error("Warehouse Location Error:", error);
      },
    });
  },
};
