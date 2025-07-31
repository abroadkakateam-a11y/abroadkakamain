"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryUpdateSchema = exports.countryCreateSchema = void 0;
var zod_1 = require("zod");
// Shared flag image schema
var flagImageSchema = zod_1.z.object({
    public_id: zod_1.z.string(),
    url: zod_1.z.string().url("Invalid image URL"),
});
exports.countryCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Country name is required"),
    code: zod_1.z.string().min(1, "Country code is required"),
    currency: zod_1.z.string().min(1, "Currency is required"),
    continent: zod_1.z.string().min(1, "Continent is required"),
    description: zod_1.z.string().optional(),
    flagImage: flagImageSchema.optional(),
});
exports.countryUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    code: zod_1.z.string().min(1).optional(),
    currency: zod_1.z.string().min(1).optional(),
    continent: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    flagImage: flagImageSchema.optional(),
});
