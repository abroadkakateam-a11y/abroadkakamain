import { Request, Response, NextFunction } from "express";
import University from "../models/University.model";
import mongoose from "mongoose";
import { SortOrder } from "mongoose";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";
import { uploadMultipleImages } from "../config/multer";
import { AppError } from "../utils/appError";

// Extend Express Request interface for user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email?: string;
      };
    }
  }
}

// Define custom files interface for our specific use case
interface UniversityFiles {
  logo?: Express.Multer.File[];
  coverImage?: Express.Multer.File[];
  reviewImages?: Express.Multer.File[];
}

interface QueryParams {
  page: number;
  limit: number;
  country?: string;
  program?: string;
  search?: string;
  sort?: string;
}

const buildFilter = (query: QueryParams) => {
  const filter: any = {};

  if (query.country) {
    filter.country = new mongoose.Types.ObjectId(query.country);
  }

  if (query.program) {
    filter.programs = { $in: [query.program] };
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { university: { $regex: query.search, $options: "i" } },
      { location: { $regex: query.search, $options: "i" } },
    ];
  }

  return filter;
};

// Fixed helper function to build sort options
const buildSort = (sortQuery?: string): Record<string, SortOrder> => {
  if (!sortQuery) return { createdAt: -1 }; // Default sort by newest first

  const [field, order] = sortQuery.split(":");
  return { [field]: (order === "desc" ? -1 : 1) as SortOrder };
};

// Helper function to handle image uploads
const handleImageUploads = async (
  files: UniversityFiles,
  existingImages?: any
) => {
  const imageUpdates: any = {};

  // Handle logo upload
  if (files?.logo?.[0]) {
    // Delete existing logo if exists
    if (existingImages?.logo?.public_id) {
      await deleteFromCloudinary(existingImages.logo.public_id);
    }

    const logoResult = (await uploadToCloudinary(
      files.logo[0],
      "universities/logos"
    )) as { public_id: string; secure_url: string };
    imageUpdates.logo = logoResult.secure_url;
    imageUpdates.logoPublicId = logoResult.public_id;
  }

  // Handle cover image upload
  if (files?.coverImage?.[0]) {
    // Delete existing cover image if exists
    if (existingImages?.coverImage?.public_id) {
      await deleteFromCloudinary(existingImages.coverImage.public_id);
    }

    const coverResult = (await uploadToCloudinary(
      files.coverImage[0],
      "universities/covers"
    )) as { public_id: string; secure_url: string };
    imageUpdates.coverImage = coverResult.secure_url;
    imageUpdates.coverImagePublicId = coverResult.public_id;
  }

  return imageUpdates;
};

export const getUniversities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Query is already validated by middleware, so we can use it directly
    const { page, limit, ...query } = req.query as unknown as QueryParams;

    const filter = buildFilter({ page, limit, ...query });
    const sort = buildSort(query.sort);

    // Get universities with pagination
    const universities = await University.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("country", "name code");

    // Get total count for pagination
    const total = await University.countDocuments(filter);

    res.status(200).json({
      status: "success",
      results: universities.length,
      data: {
        universities,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUniversityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid university ID format", 400));
    }

    const university = await University.findById(req.params.id).populate(
      "country",
      "name code"
    );

    if (!university) {
      return next(new AppError("University not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { university },
    });
  } catch (error) {
    next(error);
  }
};

export const createUniversity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return next(new AppError("Admin access required", 403));
    }

    let universityData = req.body;
    console.log("here");
    // Handle image uploads
    if (req.files) {
      const files = req.files as UniversityFiles;
      const imageUpdates = await handleImageUploads(files);
      universityData = { ...universityData, ...imageUpdates };
    }

    // Body is already validated by middleware
    const university = new University(universityData);
    await university.save();

    // Populate country data before returning
    await university.populate("country", "name code");

    res.status(201).json({
      status: "success",
      data: { university },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUniversity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return next(new AppError("Admin access required", 403));
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid university ID format", 400));
    }

    // Get existing university for image cleanup
    const existingUniversity = await University.findById(req.params.id);
    if (!existingUniversity) {
      return next(new AppError("University not found", 404));
    }

    let updateData = req.body;

    // Handle image uploads
    if (req.files) {
      const files = req.files as UniversityFiles;
      const existingImages = {
        logo: { public_id: existingUniversity.logoPublicId },
        coverImage: { public_id: existingUniversity.coverImagePublicId },
      };
      const imageUpdates = await handleImageUploads(files, existingImages);
      updateData = { ...updateData, ...imageUpdates };
    }

    // Body is already validated by middleware
    const university = await University.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("country", "name code");

    res.status(200).json({
      status: "success",
      data: { university },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUniversity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return next(new AppError("Admin access required", 403));
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid university ID format", 400));
    }

    const university = await University.findById(req.params.id);
    if (!university) {
      return next(new AppError("University not found", 404));
    }

    // Delete images from cloudinary
    if (university.logoPublicId) {
      await deleteFromCloudinary(university.logoPublicId);
    }
    if (university.coverImagePublicId) {
      await deleteFromCloudinary(university.coverImagePublicId);
    }

    // Delete university
    await University.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "University deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Multer middleware for handling image uploads
export const uploadUniversityImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadMultipleImages([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "reviewImages", maxCount: 10 },
  ])(req, res, (err: any) => {
    if (err) {
      return next(new AppError(err.message, 400));
    }
    next();
  });
};
