import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { sendSuccess, sendError } from "../utils/response.util";
import { z } from "zod";

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional().default("student").refine(
    (val) => val === "admin" || val === "student",
    { message: "Role must be either 'admin' or 'student'" }
  ),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const validatedData = registerSchema.parse(req.body);

      const user = await authService.register(validatedData);
      return sendSuccess(
        res,
        { id: user.user._id, email: user.user.email, name: user.user.name },
        "Registered",
        201
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendError(res, err.errors, "Validation failed", 400);
      }

      return sendError(
        res,
        err,
        "Registration failed",
        err instanceof Error && err.message === "Email already in use"
          ? 400
          : 500
      );
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      const data = await authService.login(validatedData);
      return sendSuccess(res, data, "Logged in");
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendError(res, err.errors, "Validation failed", 400);
      }
      return sendError(res, err, "Login failed", 400);
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const validatedData = refreshSchema.parse(req.body);

      const data = await authService.refresh(validatedData);
      return sendSuccess(res, data, "Token refreshed");
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendError(res, err.errors, "Validation failed", 400);
      }
      return sendError(res, err, "Token Refresh Failed", 400);
    }
  },
};
