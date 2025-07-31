"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var auth_service_1 = require("../services/auth.service");
var response_util_1 = require("../utils/response.util");
var zod_1 = require("zod");
// Validation schemas
var registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.string().optional().default("student").refine(function (val) { return val === "admin" || val === "student"; }, { message: "Role must be either 'admin' or 'student'" }),
});
var loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(1, "Password is required"),
});
var refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token is required"),
});
exports.authController = {
    register: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var validatedData, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    validatedData = registerSchema.parse(req.body);
                    return [4 /*yield*/, auth_service_1.authService.register(validatedData)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, (0, response_util_1.sendSuccess)(res, { id: user.user._id, email: user.user.email, name: user.user.name }, "Registered", 201)];
                case 2:
                    err_1 = _a.sent();
                    if (err_1 instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, (0, response_util_1.sendError)(res, err_1.errors, "Validation failed", 400)];
                    }
                    return [2 /*return*/, (0, response_util_1.sendError)(res, err_1, "Registration failed", err_1 instanceof Error && err_1.message === "Email already in use"
                            ? 400
                            : 500)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var validatedData, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    validatedData = loginSchema.parse(req.body);
                    return [4 /*yield*/, auth_service_1.authService.login(validatedData)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, (0, response_util_1.sendSuccess)(res, data, "Logged in")];
                case 2:
                    err_2 = _a.sent();
                    if (err_2 instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, (0, response_util_1.sendError)(res, err_2.errors, "Validation failed", 400)];
                    }
                    return [2 /*return*/, (0, response_util_1.sendError)(res, err_2, "Login failed", 400)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    refresh: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var validatedData, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    validatedData = refreshSchema.parse(req.body);
                    return [4 /*yield*/, auth_service_1.authService.refresh(validatedData)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, (0, response_util_1.sendSuccess)(res, data, "Token refreshed")];
                case 2:
                    err_3 = _a.sent();
                    if (err_3 instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, (0, response_util_1.sendError)(res, err_3.errors, "Validation failed", 400)];
                    }
                    return [2 /*return*/, (0, response_util_1.sendError)(res, err_3, "Token Refresh Failed", 400)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
