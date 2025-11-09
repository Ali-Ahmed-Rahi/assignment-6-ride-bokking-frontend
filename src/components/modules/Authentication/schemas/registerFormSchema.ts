import z from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be at most 50 characters long" }),

    email: z.string().email({ message: "Please enter a valid email address" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(50, { message: "Password must be at most 50 characters long" }),

    confirmPassword: z.string(),

    role: z.enum(["rider", "driver", "admin"] as const, {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });