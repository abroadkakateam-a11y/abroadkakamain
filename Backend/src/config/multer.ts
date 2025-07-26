import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, and PNG images are allowed'));
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter
});

export const uploadSingleImage = (fieldName: string) => upload.single(fieldName);
export const uploadMultipleImages = (fieldName: string, maxCount: number) =>
    upload.array(fieldName, maxCount);
export const uploadMixedImages = (fields: { name: string; maxCount: number }[]) =>
    upload.fields(fields);

export default upload;