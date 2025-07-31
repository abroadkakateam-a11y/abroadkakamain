"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenBody = exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
var zod_1 = require("zod");
// Validation schemas
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.string().optional().default("student").refine(function (val) { return val === "admin" || val === "student"; }, { message: "Role must be either 'admin' or 'student'" }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token is required"),
});
exports.refreshTokenBody = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
