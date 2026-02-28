import { z } from "zod";

const forbiddenCodeRegex =
  /(<\?php|<script|function\s*\(|SELECT\s+|INSERT\s+|UPDATE\s+|DELETE\s+|DROP\s+|CREATE\s+|EXEC\s+|system\(|eval\(|require\(|import\s+|export\s+)/i;

export const changePasswordSchema = z.object({
  old_password: z
    .string()
    .min(6, { message: "Old password is required" })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      message: "Invalid input: Code-like content is not allowed",
    }),
  new_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      message: "Invalid input: Code-like content is not allowed",
    }),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
