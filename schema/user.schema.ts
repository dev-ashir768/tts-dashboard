import { z } from "zod";

const forbiddenCodeRegex =
  /(<\?php|<script|function\s*\(|SELECT\s+|INSERT\s+|UPDATE\s+|DELETE\s+|DROP\s+|CREATE\s+|EXEC\s+|system\(|eval\(|require\(|import\s+|export\s+)/i;

export const changePasswordSchema = z.object({
  old_password: z
    .string()
    .min(6, {
      error: (issue) =>
        issue.input === ""
          ? "Old password is required"
          : "Old password must be at least 6 characters long",
    })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
  new_password: z
    .string()
    .min(6, {
      error: (issue) =>
        issue.input === ""
          ? "New password is required"
          : "New password must be at least 6 characters long",
    })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),
});

export const userProfileSchema = z.object({
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

  business_name: z
    .string()
    .min(3, {
      error: (issue) =>
        issue.input === ""
          ? "Business name is required"
          : "Business name must be at least 3 characters",
    })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),

  address: z
    .string()
    .min(3, {
      error: (issue) =>
        issue.input === ""
          ? "Address is required"
          : "Address must be at least 3 characters",
    })
    .trim()
    .refine((val) => !forbiddenCodeRegex.test(val), {
      error: "Invalid input: Code-like content is not allowed",
    }),

  brand_image: z
    .string()
    .min(1, { message: "Brand image is required" })
    .refine((val) => val.startsWith("data:image/") || val.startsWith("http"), {
      message: "Invalid brand image",
    }),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
