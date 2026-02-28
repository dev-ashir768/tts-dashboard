import { z } from "zod";

const forbiddenCodeRegex =
  /(<\?php|<script|function\s*\(|SELECT\s+|INSERT\s+|UPDATE\s+|DELETE\s+|DROP\s+|CREATE\s+|EXEC\s+|system\(|eval\(|require\(|import\s+|export\s+)/i;

export const loginSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits")
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      message: "Invalid input: Code-like content is not allowed",
    })
    .transform((val) => Number(val)),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      message: "Invalid input: Code-like content is not allowed",
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type OtpFormValues = z.input<typeof otpSchema>;
export type OtpFormPayload = z.output<typeof otpSchema>;
