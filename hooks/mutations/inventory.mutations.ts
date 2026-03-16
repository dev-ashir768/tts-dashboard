import { InventoryFormValues } from "@/schema/inventory.schema";
import { inventoryService } from "@/services/inventory.service";
import { ApiErrorResponse } from "@/types/general.types";
import {
  CreateInventoryResponse,
  UpdateInventoryProps,
  UpdateInventoryResponse,
} from "@/types/inventory.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useInventoryMutation = {
  CreateInventoryMutation: () => {
    return useMutation<
      CreateInventoryResponse,
      AxiosError<ApiErrorResponse>,
      InventoryFormValues
    >({
      mutationFn: (data) => inventoryService.createInventory(data),
      onSuccess: (data) => {
        toast.success(data.message || "Inventory created successfully");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to create inventory",
        );
      },
    });
  },

  UpdateInventoryMutation: () => {
    return useMutation<
      UpdateInventoryResponse,
      AxiosError<ApiErrorResponse>,
      UpdateInventoryProps
    >({
      mutationFn: (data) => inventoryService.updateInventory(data),
      onSuccess: (data) => {
        toast.success(data.message || "Inventory updated successfully");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to update inventory",
        );
      },
    });
  },
};
