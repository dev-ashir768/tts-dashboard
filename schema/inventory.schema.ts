import { COUNTRY } from "@/lib/constants";
import * as z from "zod";

export const inventorySchema = z.object({
  user_id: z.number().int().positive("User ID is required"),
  acno: z.string().min(1, "Account number is required"),
  warehouse_id: z.number().int().positive("Warehouse is required"),
  sku_name: z.string().min(1, "SKU Name is required"),
  sku_code: z.string().min(1, "SKU Code is required"),
  quantity: z.number().int().nonnegative("Quantity must be at least 0"),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().min(1, "Image is required"),
  country: z.enum(COUNTRY, { message: "Country is required" }),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;
