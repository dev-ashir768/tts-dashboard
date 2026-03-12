import { z } from "zod";
import { REGEX } from "@/lib/constants";

export const orderSchema = z
  .object({
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
    tracking_id: z
      .string()
      .min(3, { message: "Tracking Id is required" })
      .trim()
      .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
        error: "Invalid input: Code-like content is not allowed",
      }),
    asin_id: z
      .string()
      .min(3, { message: "ASIN Id is required" })
      .trim()
      .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
        error: "Invalid input: Code-like content is not allowed",
      }),
    shipper_address: z
      .string()
      .min(3, {
        error: (issue) =>
          issue.input === ""
            ? "Shipper address is required"
            : "Shipper address must be at least 10 characters",
      })
      .trim()
      .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
        error: "Invalid input: Code-like content is not allowed",
      }),
    remarks: z
      .string()
      .min(3, {
        error: (issue) =>
          issue.input === ""
            ? "Remarks is required"
            : "Remarks must be at least 10 characters",
      })
      .trim()
      .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
        error: "Invalid input: Code-like content is not allowed",
      }),
    consignee_address: z
      .string()
      .trim()
      .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
        error: "Invalid input: Code-like content is not allowed",
      })
      .optional(),
    label_pdf: z
      .string()
      .refine((val) => !val || val.startsWith("data:application/"), {
        message: "Invalid label pdf",
      })
      .optional(),
    label_image_1: z
      .string()
      .refine((val) => !val || val.startsWith("data:image/"), {
        message: "Invalid image format",
      })
      .optional(),
    label_image_2: z
      .string()
      .refine((val) => !val || val.startsWith("data:image/"), {
        message: "Invalid image format",
      })
      .optional(),
    label_image_3: z
      .string()
      .refine((val) => !val || val.startsWith("data:image/"), {
        message: "Invalid image format",
      })
      .optional(),
    label_image_4: z
      .string()
      .refine((val) => !val || val.startsWith("data:image/"), {
        message: "Invalid image format",
      })
      .optional(),
    label_image_5: z
      .string()
      .refine((val) => !val || val.startsWith("data:image/"), {
        message: "Invalid image format",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const hasAddress =
      data.consignee_address && data.consignee_address.length >= 3;
    const hasLabel = data.label_pdf && data.label_pdf.length > 0;

    if (!hasAddress && !hasLabel) {
      ctx.addIssue({
        code: "custom",
        message: "Please provide either a Consignee Address or a Label PDF.",
        path: ["consignee_address"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Please provide either a Consignee Address or a Label PDF.",
        path: ["label_pdf"],
      });
    } else if (hasAddress && hasLabel) {
      ctx.addIssue({
        code: "custom",
        message: "Only one of Label PDF or Consignee Address can be provided!",
        path: ["consignee_address"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Only one of Label PDF or Consignee Address can be provided!",
        path: ["label_pdf"],
      });
    }
  });

export type OrderFormValues = z.infer<typeof orderSchema>;
