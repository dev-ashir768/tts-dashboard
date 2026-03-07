import { z } from "zod";
import { COUNTRY, REGEX } from "@/lib/constants";

export const signinSchema = z.object({
  email: z
    .email({
      error: (issue) =>
        issue.input === "" ? "Email is required" : "Invalid email address",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  password: z
    .string()
    .min(8, {
      error: (issue) =>
        issue.input === ""
          ? "Password is required"
          : "Password must be at least 6 characters long",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
});

export const signupSchema = z.object({
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
    .min(8, {
      error: (issue) =>
        issue.input === ""
          ? "Password is required"
          : "Password must be at least 6 characters long",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  country: z
    .enum(COUNTRY, { message: "Country is required" })
    .nullable()
    .optional(),
});

export const verifyOTPschema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits")
    .trim()
    .refine((val) => !REGEX.FORBIDDEN_CODE.test(val), {
      message: "Invalid input: Code-like content is not allowed",
    }),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type VerifyOTPFormValues = z.infer<typeof verifyOTPschema>;
