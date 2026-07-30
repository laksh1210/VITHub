import { z } from "zod";

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username may only contain letters, numbers, dots, underscores and hyphens"),
  email: z.string().email("Must be a valid email address").max(150),
  password: z.string().min(8, "Password must be at least 8 characters long").max(100),
  fullName: z.string().min(1, "Full name is required").max(150),
});

export type RegisterInput = z.infer<typeof registerSchema>;
