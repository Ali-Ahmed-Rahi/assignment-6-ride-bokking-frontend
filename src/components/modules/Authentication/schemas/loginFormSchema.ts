import { z } from "zod";

// ✅ Login form validation schema
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// ✅ Export TypeScript type for the form
export type LoginFormValues = z.infer<typeof loginFormSchema>;
