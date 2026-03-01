import { z } from "zod";

const forbiddenCodeRegex =
  /(<\?php|<script|function\s*\(|SELECT\s+|INSERT\s+|UPDATE\s+|DELETE\s+|DROP\s+|CREATE\s+|EXEC\s+|system\(|eval\(|require\(|import\s+|export\s+)/i;
const phoneRegex =
  /^(?:(?:\+|00)44|0)7(?:[45789]\d{2}|624)\d{6}$|^(?:\+1|1)?\s?\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$|^(\+92|92|0|0092)?(3\d{2}|\d{3})?\d{7}$/;

export const signinSchema = z.object({
  email: z
    .email({
      error: (issue) =>
        issue.input === "" ? "Email is required" : "Invalid email address",
    })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
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
    .refine((val) => !forbiddenCodeRegex.test(val), {
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
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  email: z
    .email({
      error: (issue) =>
        issue.input === "" ? "Email is required" : "Invalid email address",
    })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  contact_no: z
    .string()
    .min(1, "Contact number is required")
    .trim()
    .refine((val) => phoneRegex.test(val), {
      message: "Invalid format. Please enter a valid UK, US, or PK number.",
    })
    .refine((val) => !forbiddenCodeRegex.test(val), {
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
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
});

export const verifyOTPschema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits")
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      message: "Invalid input: Code-like content is not allowed",
    })
});

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type VerifyOTPFormValues = z.infer<typeof verifyOTPschema>;
