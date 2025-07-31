"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
var cloudinary_1 = require("cloudinary");
var stream_1 = require("stream");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
// Upload image to Cloudinary
var uploadToCloudinary = function (file, folder) {
    if (folder === void 0) { folder = "uploads"; }
    return new Promise(function (resolve, reject) {
        var uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: folder,
            resource_type: "image",
            transformation: [
                { width: 1200, height: 800, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "auto" },
            ],
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            else if (result) {
                resolve({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                });
            }
            else {
                reject(new Error("Upload failed"));
            }
        });
        // Convert buffer to stream and pipe to Cloudinary
        var bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
// Delete image from Cloudinary
var deleteFromCloudinary = function (publicId) {
    return new Promise(function (resolve, reject) {
        cloudinary_1.v2.uploader.destroy(publicId, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.deleteFromCloudinary = deleteFromCloudinary;
exports.default = cloudinary_1.v2;
