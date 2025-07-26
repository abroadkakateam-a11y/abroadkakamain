import { z } from "zod";

// Shared flag image schema
const flagImageSchema = z.object({
    public_id: z.string(),
    url: z.string().url("Invalid image URL"),
});

export const countryCreateSchema = z.object({
    name: z.string().min(1, "Country name is required"),
    code: z.string().min(1, "Country code is required"),
    currency: z.string().min(1, "Currency is required"),
    continent: z.string().min(1, "Continent is required"),
    description: z.string().optional(),
    flagImage: flagImageSchema.optional(),
});

export const countryUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    code: z.string().min(1).optional(),
    currency: z.string().min(1).optional(),
    continent: z.string().min(1).optional(),
    description: z.string().optional(),
    flagImage: flagImageSchema.optional(),
});
