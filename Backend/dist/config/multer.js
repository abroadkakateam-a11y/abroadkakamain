"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageArray = exports.uploadMultipleImages = exports.uploadSingleImage = void 0;
var multer_1 = __importDefault(require("multer"));
// Configure multer for memory storage (since we're uploading to Cloudinary)
var storage = multer_1.default.memoryStorage();
// File filter function
var fileFilter = function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
// Multer configuration
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});
// Export single image upload
var uploadSingleImage = function (fieldName) { return upload.single(fieldName); };
exports.uploadSingleImage = uploadSingleImage;
// Export multiple image upload with field configuration
var uploadMultipleImages = function (fields) {
    return upload.fields(fields);
};
exports.uploadMultipleImages = uploadMultipleImages;
// Export array of images for single field
var uploadImageArray = function (fieldName, maxCount) {
    return upload.array(fieldName, maxCount);
};
exports.uploadImageArray = uploadImageArray;
exports.default = upload;
