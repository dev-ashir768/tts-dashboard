import { z } from "zod";
import { COUNTRY, REGEX } from "@/lib/constants";

export const warehouseSchema = z.object({
  address: z
    .string()
    .min(3, {
      error: (issue) =>
        issue.input === ""
          ? "Address is required"
          : "Address must be at least 10 characters",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  country: z
    .enum(COUNTRY, { message: "Country is required" })
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  acno: z
    .string()
    .min(3, { message: "Account number is required" })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  user_id: z
    .number({ message: "Account number is required" })
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(String(val)), {
      error: "Invalid input: Code-like content is not allowed",
    }),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
