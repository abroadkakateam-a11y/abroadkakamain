import cloudinary from "../config/cloudinary";

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    [key: string]: any; // optional fallback
}

export const uploadToCloudinary = async (
    file: Express.Multer.File,
    folder: string
): Promise<CloudinaryUploadResult> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder, resource_type: 'auto' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result as CloudinaryUploadResult);
            }
        ).end(file.buffer);
    });
};
