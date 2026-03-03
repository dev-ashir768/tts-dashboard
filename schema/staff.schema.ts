import { REGEX } from "@/lib/constants";
import { z } from "zod";

export const staffSchema = z.object({
  full_name: z
    .string()
    .min(3, {
      error: (issue) =>
        issue.input === ""
          ? "Full name is required"
          : "Full name must be at least 3 characters",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  email: z
    .email({
      error: (issue) =>
        issue.input === "" ? "Email is required" : "Invalid email address",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  contact_no: z
    .string()
    .min(1, "Contact number is required")
    .trim()
    .refine((val) => REGEX.PHONE.test(val), {
      message: "Invalid format. Please enter a valid UK, US, or PK number.",
    })
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  password: z
    .string()
    .min(6, {
      error: (issue) =>
        issue.input === ""
          ? "Password is required"
          : "Password must be at least 6 characters long",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
});

export type StaffFormValues = z.infer<typeof staffSchema>;