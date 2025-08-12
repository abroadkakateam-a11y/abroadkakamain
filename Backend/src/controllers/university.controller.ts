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
  photos?: Express.Multer.File[];
}

interface QueryParams {
  page?: number;
  limit?: number;
  country?: string;
  program?: string;
  search?: string;
  sort?: string;
}

const buildFilter = (query: Partial<QueryParams>) => {
  const filter: any = {};

  // Handle country filter - skip if "all"
  if (query.country && query.country !== "all") {
    try {
      filter.country = new mongoose.Types.ObjectId(query.country);
    } catch (error) {
      throw new AppError("Invalid country ID format", 400);
    }
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

const buildSort = (sortQuery?: string): Record<string, SortOrder> => {
  if (!sortQuery) return { createdAt: -1 }; // Default sort by newest first

  const [field, order] = sortQuery.split(":");
  return { [field]: (order === "desc" ? -1 : 1) as SortOrder };
};

const handleImageUploads = async (
  files: UniversityFiles,
  existingUniversity?: any
) => {
  const imageUpdates: any = {};

  // Handle logo upload
  if (files?.logo?.[0]) {
    // Delete existing logo if exists
    if (existingUniversity?.logoPublicId) {
      await deleteFromCloudinary(existingUniversity.logoPublicId);
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
    if (existingUniversity?.coverImagePublicId) {
      await deleteFromCloudinary(existingUniversity.coverImagePublicId);
    }

    const coverResult = (await uploadToCloudinary(
      files.coverImage[0],
      "universities/covers"
    )) as { public_id: string; secure_url: string };
    imageUpdates.coverImage = coverResult.secure_url;
    imageUpdates.coverImagePublicId = coverResult.public_id;
  }

  // Handle photos upload (multiple images)
  if (files?.photos?.length) {
    // Delete existing photos if needed (optional - depends on your requirements)
    if (existingUniversity?.photos?.length) {
      await Promise.all(
        existingUniversity.photos.map(async (photo: any) => {
          if (photo.publicId) {
            await deleteFromCloudinary(photo.publicId);
          }
        })
      );
    }

    // Upload new photos
    const photoUploads = await Promise.all(
      files.photos.map(async (file) => {
        const result = (await uploadToCloudinary(
          file,
          "universities/photos"
        )) as { public_id: string; secure_url: string };
        return {
          url: result.secure_url,
          publicId: result.public_id,
          caption: file.originalname, // You can customize this
        };
      })
    );

    imageUpdates.photos = photoUploads;
  }

  return imageUpdates;
};

export const getUniversities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page: pageParam,
      limit: limitParam,
      ...query
    } = req.query as unknown as QueryParams;

    const page = pageParam || 1;
    const limit = limitParam || 10;

    const filter = buildFilter({ page, limit, ...query });
    const sort = buildSort(query.sort);

    const universities = await University.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("country", "name code");

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
    if (!req.user || req.user.role !== "admin") {
      return next(new AppError("Admin access required", 403));
    }

    let universityData = req.body;

    // Handle image uploads
    if (req.files) {
      const files = req.files as UniversityFiles;
      const imageUpdates = await handleImageUploads(files);
      universityData = { ...universityData, ...imageUpdates };
    }

    // Ensure numeric lat/lng if provided
    if (universityData.latitude && universityData.longitude) {
      universityData.latitude = Number(universityData.latitude);
      universityData.longitude = Number(universityData.longitude);
    }

    const university = new University(universityData);
    await university.save();

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
    if (!req.user || req.user.role !== "admin") {
      return next(new AppError("Admin access required", 403));
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid university ID format", 400));
    }

    const existingUniversity = await University.findById(req.params.id);
    if (!existingUniversity) {
      return next(new AppError("University not found", 404));
    }

    let updateData = req.body;

    // Handle image uploads
    if (req.files) {
      const files = req.files as UniversityFiles;
      const imageUpdates = await handleImageUploads(files, existingUniversity);
      updateData = { ...updateData, ...imageUpdates };
    }

    // Ensure numeric lat/lng if provided
    if (updateData.latitude && updateData.longitude) {
      updateData.latitude = Number(updateData.latitude);
      updateData.longitude = Number(updateData.longitude);
    }

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
    if (!req.user || req.user.role !== "admin") {
      return next(new AppError("Admin access required", 403));
    }

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

    // Delete all photos
    if (university.photos?.length) {
      await Promise.all(
        university.photos.map(async (photo: any) => {
          if (photo.publicId) {
            await deleteFromCloudinary(photo.publicId);
          }
        })
      );
    }

    await University.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "University deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const uploadUniversityImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadMultipleImages([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "photos", maxCount: 20 },
    { name: "reviewImages", maxCount: 10 },
  ])(req, res, (err: any) => {
    if (err) {
      return next(new AppError(err.message, 400));
    }
    next();
  });
};