import multer from 'multer';
import { Request } from 'express';

// Configure multer for memory storage (since we're uploading to Cloudinary)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Export single image upload
export const uploadSingleImage = (fieldName: string) => upload.single(fieldName);

// Export multiple image upload with field configuration
export const uploadMultipleImages = (fields: { name: string; maxCount: number }[]) =>
    upload.fields(fields);

// Export array of images for single field
export const uploadImageArray = (fieldName: string, maxCount: number) =>
    upload.array(fieldName, maxCount);

export default upload;