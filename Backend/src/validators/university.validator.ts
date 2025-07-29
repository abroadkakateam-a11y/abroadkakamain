// validators/university.validator.ts
import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// Schema for Highlight
const highlightSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
});

// Schema for Review
const reviewSchema = z.object({
  name: z.string(),
  image: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string(),
});

// Schema for FAQ
const faqSchema = z.object({
  q: z.string(),
  a: z.string(),
});

// Schema for Fee Structure
const feeStructureSchema = z.object({
  year: z.number(),
  tuition: z.number(),
  hostel: z.number(),
});
// Helper for validating ObjectId
const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  });

// Main University Schema
export const createUniversitySchema = z.object({
  name: z.string(),
  university: z.string(),
  country: objectIdSchema,
  location: z.string().optional(),
  tagline: z.string().optional(),
  coverImage: z.string().optional(),
  coverImagePublicId: z.string().optional(),
  logo: z.string().optional(),
  logoPublicId: z.string().optional(),
  established: z.string().optional(),
  highlights: z.array(highlightSchema).optional(),
  about: z.string().optional(),
  programs: z.array(z.string()).optional(),
  duration: z.string().optional(),
  medium: z.string().optional(),
  gpaRequired: z.string().optional(),
  feesUSD: z.string().optional(),
  feesINR: z.string().optional(),
  feeStructure: z.array(feeStructureSchema).optional(),
  hostelCost: z.string().optional(),
  approvedBy: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  eligibility: z.array(z.string()).optional(),
  admissionSteps: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(),
  reviews: z.array(reviewSchema).optional(),
  faqs: z.array(faqSchema).optional(),
  comparison: z.array(z.any()).optional(),
});

export const updateUniversitySchema = createUniversitySchema.partial();

// Query parameters validation for GET requests - Fixed type conversion
export const getUniversitiesSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "1") || 1)
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "10") || 10)
    .pipe(z.number().int().min(1).max(100)),
  country: objectIdSchema.optional(),
  program: z.string().optional(),
  search: z.string().optional(),
  sort: z.string().optional(),
});

// Separate validator for query parameters
export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = getUniversitiesSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    // Replace query with validated values
    req.query = result.data as any;
    next();
  } catch (error) {
    console.error("Query validation error:", error);
    res.status(500).json({ message: "Query validation failed" });
  }
};

// Validator middleware for body validation
export const validateUniversity = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      // Replace body with validated values
      req.body = result.data;
      next();
    } catch (error) {
      console.error("Validation error:", error);
      res.status(500).json({ message: "Validation failed" });
    }
  };
};
