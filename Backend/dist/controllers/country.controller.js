"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCountryFlag = exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getCountry = exports.getAllCountries = void 0;
var country_service_1 = __importDefault(require("../services/country.service"));
var multer_1 = require("../config/multer");
var cloudinary_1 = require("../config/cloudinary");
var appError_1 = require("../utils/appError");
var country_validator_1 = require("../validators/country.validator");
var countryService = new country_service_1.default();
var getAllCountries = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var countries, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, countryService.getAllCountries(req.query)];
            case 1:
                countries = _a.sent();
                res.status(200).json({
                    status: "success",
                    results: countries.length,
                    data: { countries: countries },
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCountries = getAllCountries;
var getCountry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var country, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, countryService.getCountry(req.params.id)];
            case 1:
                country = _a.sent();
                res.status(200).json({
                    status: "success",
                    data: { country: country },
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCountry = getCountry;
var createCountry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var countryData, result, parsedData, newCountry, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                countryData = req.body;
                if (!req.file) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, cloudinary_1.uploadToCloudinary)(req.file, "countries/flags")];
            case 1:
                result = (_a.sent());
                countryData.flagImage = {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
                _a.label = 2;
            case 2:
                parsedData = country_validator_1.countryCreateSchema.parse(countryData);
                return [4 /*yield*/, countryService.createCountry(parsedData)];
            case 3:
                newCountry = _a.sent();
                res.status(201).json({
                    status: "success",
                    data: { country: newCountry },
                });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCountry = createCountry;
var updateCountry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateData, country, result, updatedCountry, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                updateData = req.body;
                if (!req.file) return [3 /*break*/, 5];
                return [4 /*yield*/, countryService.getCountry(req.params.id)];
            case 1:
                country = _b.sent();
                if (!((_a = country.flagImage) === null || _a === void 0 ? void 0 : _a.public_id)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cloudinary_1.deleteFromCloudinary)(country.flagImage.public_id)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, (0, cloudinary_1.uploadToCloudinary)(req.file, "countries/flags")];
            case 4:
                result = (_b.sent());
                updateData.flagImage = {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
                _b.label = 5;
            case 5: return [4 /*yield*/, countryService.updateCountry(req.params.id, updateData)];
            case 6:
                updatedCountry = _b.sent();
                res.status(200).json({
                    status: "success",
                    data: { country: updatedCountry },
                });
                return [3 /*break*/, 8];
            case 7:
                err_4 = _b.sent();
                next(err_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateCountry = updateCountry;
var deleteCountry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var country, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                return [4 /*yield*/, countryService.getCountry(req.params.id)];
            case 1:
                country = _b.sent();
                if (!((_a = country.flagImage) === null || _a === void 0 ? void 0 : _a.public_id)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cloudinary_1.deleteFromCloudinary)(country.flagImage.public_id)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, countryService.deleteCountry(req.params.id)];
            case 4:
                _b.sent();
                res.status(204).json({
                    status: "success",
                    data: null,
                });
                return [3 /*break*/, 6];
            case 5:
                err_5 = _b.sent();
                next(err_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteCountry = deleteCountry;
var uploadCountryFlag = function (req, res, next) {
    (0, multer_1.uploadSingleImage)("flag")(req, res, function (err) {
        if (err) {
            return next(new appError_1.AppError(err.message, 400));
        }
        next();
    });
};
exports.uploadCountryFlag = uploadCountryFlag;
