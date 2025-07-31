"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUniversity = exports.validateQuery = exports.getUniversitiesSchema = exports.updateUniversitySchema = exports.createUniversitySchema = void 0;
// validators/university.validator.ts
var zod_1 = require("zod");
var mongoose_1 = __importDefault(require("mongoose"));
// Schema for Highlight
var highlightSchema = zod_1.z.object({
    label: zod_1.z.string(),
    value: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
});
// Schema for Review
var reviewSchema = zod_1.z.object({
    name: zod_1.z.string(),
    image: zod_1.z.string(),
    rating: zod_1.z.number().min(1).max(5),
    review: zod_1.z.string(),
});
// Schema for FAQ
var faqSchema = zod_1.z.object({
    q: zod_1.z.string(),
    a: zod_1.z.string(),
});
// Schema for Fee Structure
var feeStructureSchema = zod_1.z.object({
    year: zod_1.z.number(),
    tuition: zod_1.z.number(),
    hostel: zod_1.z.number(),
});
// Helper for validating ObjectId
var objectIdSchema = zod_1.z
    .string()
    .refine(function (value) { return mongoose_1.default.Types.ObjectId.isValid(value); }, {
    message: "Invalid ObjectId",
});
// Main University Schema
exports.createUniversitySchema = zod_1.z.object({
    name: zod_1.z.string(),
    university: zod_1.z.string(),
    country: objectIdSchema,
    location: zod_1.z.string().optional(),
    tagline: zod_1.z.string().optional(),
    coverImage: zod_1.z.string().optional(),
    coverImagePublicId: zod_1.z.string().optional(),
    logo: zod_1.z.string().optional(),
    logoPublicId: zod_1.z.string().optional(),
    established: zod_1.z.string().optional(),
    highlights: zod_1.z.array(highlightSchema).optional(),
    about: zod_1.z.string().optional(),
    programs: zod_1.z.array(zod_1.z.string()).optional(),
    duration: zod_1.z.string().optional(),
    medium: zod_1.z.string().optional(),
    gpaRequired: zod_1.z.string().optional(),
    feesUSD: zod_1.z.string().optional(),
    feesINR: zod_1.z.string().optional(),
    feeStructure: zod_1.z.array(feeStructureSchema).optional(),
    hostelCost: zod_1.z.string().optional(),
    approvedBy: zod_1.z.array(zod_1.z.string()).optional(),
    facilities: zod_1.z.array(zod_1.z.string()).optional(),
    eligibility: zod_1.z.array(zod_1.z.string()).optional(),
    admissionSteps: zod_1.z.array(zod_1.z.string()).optional(),
    documents: zod_1.z.array(zod_1.z.string()).optional(),
    reviews: zod_1.z.array(reviewSchema).optional(),
    faqs: zod_1.z.array(faqSchema).optional(),
    comparison: zod_1.z.array(zod_1.z.any()).optional(),
});
exports.updateUniversitySchema = exports.createUniversitySchema.partial();
// Query parameters validation for GET requests - Fixed type conversion
exports.getUniversitiesSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .transform(function (val) { return parseInt(val || "1") || 1; })
        .pipe(zod_1.z.number().int().positive()),
    limit: zod_1.z
        .string()
        .optional()
        .transform(function (val) { return parseInt(val || "10") || 10; })
        .pipe(zod_1.z.number().int().min(1).max(100)),
    country: objectIdSchema.optional(),
    program: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    sort: zod_1.z.string().optional(),
});
// Separate validator for query parameters
var validateQuery = function (req, res, next) {
    try {
        var result = exports.getUniversitiesSchema.safeParse(req.query);
        if (!result.success) {
            res.status(400).json({
                errors: result.error.issues.map(function (issue) { return ({
                    field: issue.path.join("."),
                    message: issue.message,
                }); }),
            });
            return;
        }
        // Replace query with validated values
        Object.assign(req.query, result.data);
        next();
    }
    catch (error) {
        console.error("Query validation error:", error);
        res.status(500).json({ message: "Query validation failed" });
    }
};
exports.validateQuery = validateQuery;
// Validator middleware for body validation
var validateUniversity = function (schema) {
    return function (req, res, next) {
        try {
            var result = schema.safeParse(req.body);
            if (!result.success) {
                res.status(400).json({
                    errors: result.error.issues.map(function (issue) { return ({
                        field: issue.path.join("."),
                        message: issue.message,
                    }); }),
                });
                return;
            }
            // Replace body with validated values
            req.body = result.data;
            next();
        }
        catch (error) {
            console.error("Validation error:", error);
            res.status(500).json({ message: "Validation failed" });
        }
    };
};
exports.validateUniversity = validateUniversity;
