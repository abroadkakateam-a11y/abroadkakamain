"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUniversityImages = exports.deleteUniversity = exports.updateUniversity = exports.createUniversity = exports.getUniversityById = exports.getUniversities = void 0;
var University_model_1 = __importDefault(require("../models/University.model"));
var mongoose_1 = __importDefault(require("mongoose"));
var cloudinary_1 = require("../config/cloudinary");
var multer_1 = require("../config/multer");
var appError_1 = require("../utils/appError");
var buildFilter = function (query) {
    var filter = {};
    // Handle country filter - skip if "all"
    if (query.country && query.country !== "all") {
        try {
            filter.country = new mongoose_1.default.Types.ObjectId(query.country);
        }
        catch (error) {
            throw new appError_1.AppError("Invalid country ID format", 400);
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
// Fixed helper function to build sort options
var buildSort = function (sortQuery) {
    var _a;
    if (!sortQuery)
        return { createdAt: -1 }; // Default sort by newest first
    var _b = sortQuery.split(":"), field = _b[0], order = _b[1];
    return _a = {}, _a[field] = (order === "desc" ? -1 : 1), _a;
};
// Helper function to handle image uploads
var handleImageUploads = function (files, existingImages) { return __awaiter(void 0, void 0, void 0, function () {
    var imageUpdates, logoResult, coverResult;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                imageUpdates = {};
                if (!((_a = files === null || files === void 0 ? void 0 : files.logo) === null || _a === void 0 ? void 0 : _a[0])) return [3 /*break*/, 4];
                if (!((_b = existingImages === null || existingImages === void 0 ? void 0 : existingImages.logo) === null || _b === void 0 ? void 0 : _b.public_id)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, cloudinary_1.deleteFromCloudinary)(existingImages.logo.public_id)];
            case 1:
                _e.sent();
                _e.label = 2;
            case 2: return [4 /*yield*/, (0, cloudinary_1.uploadToCloudinary)(files.logo[0], "universities/logos")];
            case 3:
                logoResult = (_e.sent());
                imageUpdates.logo = logoResult.secure_url;
                imageUpdates.logoPublicId = logoResult.public_id;
                _e.label = 4;
            case 4:
                if (!((_c = files === null || files === void 0 ? void 0 : files.coverImage) === null || _c === void 0 ? void 0 : _c[0])) return [3 /*break*/, 8];
                if (!((_d = existingImages === null || existingImages === void 0 ? void 0 : existingImages.coverImage) === null || _d === void 0 ? void 0 : _d.public_id)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, cloudinary_1.deleteFromCloudinary)(existingImages.coverImage.public_id)];
            case 5:
                _e.sent();
                _e.label = 6;
            case 6: return [4 /*yield*/, (0, cloudinary_1.uploadToCloudinary)(files.coverImage[0], "universities/covers")];
            case 7:
                coverResult = (_e.sent());
                imageUpdates.coverImage = coverResult.secure_url;
                imageUpdates.coverImagePublicId = coverResult.public_id;
                _e.label = 8;
            case 8: return [2 /*return*/, imageUpdates];
        }
    });
}); };
var getUniversities = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageParam, limitParam, query, page, limit, filter, sort, universities, total, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.query, pageParam = _a.page, limitParam = _a.limit, query = __rest(_a, ["page", "limit"]);
                page = pageParam || 1;
                limit = limitParam || 10;
                filter = buildFilter(__assign({ page: page, limit: limit }, query));
                sort = buildSort(query.sort);
                return [4 /*yield*/, University_model_1.default.find(filter)
                        .sort(sort)
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .populate("country", "name code")];
            case 1:
                universities = _b.sent();
                return [4 /*yield*/, University_model_1.default.countDocuments(filter)];
            case 2:
                total = _b.sent();
                res.status(200).json({
                    status: "success",
                    results: universities.length,
                    data: {
                        universities: universities,
                        pagination: {
                            page: page,
                            limit: limit,
                            total: total,
                            totalPages: Math.ceil(total / limit),
                        },
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUniversities = getUniversities;
var getUniversityById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var university, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Validate ObjectId format
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                    return [2 /*return*/, next(new appError_1.AppError("Invalid university ID format", 400))];
                }
                return [4 /*yield*/, University_model_1.default.findById(req.params.id).populate("country", "name code")];
            case 1:
                university = _a.sent();
                if (!university) {
                    return [2 /*return*/, next(new appError_1.AppError("University not found", 404))];
                }
                res.status(200).json({
                    status: "success",
                    data: { university: university },
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUniversityById = getUniversityById;
var createUniversity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var universityData, files, imageUpdates, university, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                // Check if user is admin
                if (!req.user || req.user.role !== "admin") {
                    return [2 /*return*/, next(new appError_1.AppError("Admin access required", 403))];
                }
                universityData = req.body;
                console.log("here");
                if (!req.files) return [3 /*break*/, 2];
                files = req.files;
                return [4 /*yield*/, handleImageUploads(files)];
            case 1:
                imageUpdates = _a.sent();
                universityData = __assign(__assign({}, universityData), imageUpdates);
                _a.label = 2;
            case 2:
                university = new University_model_1.default(universityData);
                return [4 /*yield*/, university.save()];
            case 3:
                _a.sent();
                // Populate country data before returning
                return [4 /*yield*/, university.populate("country", "name code")];
            case 4:
                // Populate country data before returning
                _a.sent();
                res.status(201).json({
                    status: "success",
                    data: { university: university },
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUniversity = createUniversity;
var updateUniversity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUniversity, updateData, files, existingImages, imageUpdates, university, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                // Check if user is admin
                if (!req.user || req.user.role !== "admin") {
                    return [2 /*return*/, next(new appError_1.AppError("Admin access required", 403))];
                }
                // Validate ObjectId format
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                    return [2 /*return*/, next(new appError_1.AppError("Invalid university ID format", 400))];
                }
                return [4 /*yield*/, University_model_1.default.findById(req.params.id)];
            case 1:
                existingUniversity = _a.sent();
                if (!existingUniversity) {
                    return [2 /*return*/, next(new appError_1.AppError("University not found", 404))];
                }
                updateData = req.body;
                if (!req.files) return [3 /*break*/, 3];
                files = req.files;
                existingImages = {
                    logo: { public_id: existingUniversity.logoPublicId },
                    coverImage: { public_id: existingUniversity.coverImagePublicId },
                };
                return [4 /*yield*/, handleImageUploads(files, existingImages)];
            case 2:
                imageUpdates = _a.sent();
                updateData = __assign(__assign({}, updateData), imageUpdates);
                _a.label = 3;
            case 3: return [4 /*yield*/, University_model_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).populate("country", "name code")];
            case 4:
                university = _a.sent();
                res.status(200).json({
                    status: "success",
                    data: { university: university },
                });
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateUniversity = updateUniversity;
var deleteUniversity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var university, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                // Check if user is admin
                if (!req.user || req.user.role !== "admin") {
                    return [2 /*return*/, next(new appError_1.AppError("Admin access required", 403))];
                }
                // Validate ObjectId format
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                    return [2 /*return*/, next(new appError_1.AppError("Invalid university ID format", 400))];
                }
                return [4 /*yield*/, University_model_1.default.findById(req.params.id)];
            case 1:
                university = _a.sent();
                if (!university) {
                    return [2 /*return*/, next(new appError_1.AppError("University not found", 404))];
                }
                if (!university.logoPublicId) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cloudinary_1.deleteFromCloudinary)(university.logoPublicId)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!university.coverImagePublicId) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, cloudinary_1.deleteFromCloudinary)(university.coverImagePublicId)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: 
            // Delete university
            return [4 /*yield*/, University_model_1.default.findByIdAndDelete(req.params.id)];
            case 6:
                // Delete university
                _a.sent();
                res.status(200).json({
                    status: "success",
                    message: "University deleted successfully",
                });
                return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deleteUniversity = deleteUniversity;
// Multer middleware for handling image uploads
var uploadUniversityImages = function (req, res, next) {
    (0, multer_1.uploadMultipleImages)([
        { name: "logo", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
        { name: "reviewImages", maxCount: 10 },
    ])(req, res, function (err) {
        if (err) {
            return next(new appError_1.AppError(err.message, 400));
        }
        next();
    });
};
exports.uploadUniversityImages = uploadUniversityImages;
