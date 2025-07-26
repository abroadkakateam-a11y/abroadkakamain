import { z } from "zod";

// Validation schemas
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional().default("student").refine(
    (val) => val === "admin" || val === "student",
    { message: "Role must be either 'admin' or 'student'" }
  ),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const refreshTokenBody = z.object({
  refreshToken: z.string(),
});
