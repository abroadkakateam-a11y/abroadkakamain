"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var university_controller_1 = require("../controllers/university.controller");
var university_validator_1 = require("../validators/university.validator");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = express_1.default.Router();
router.get("/", university_validator_1.validateQuery, university_controller_1.getUniversities);
router.get("/:id", university_controller_1.getUniversityById);
router.post("/", (0, auth_middleware_1.authenticate)(["admin"]), // Only admin can create countries,
university_controller_1.uploadUniversityImages, (0, university_validator_1.validateUniversity)(university_validator_1.createUniversitySchema), university_controller_1.createUniversity);
router.put("/:id", (0, auth_middleware_1.authenticate)(), university_controller_1.uploadUniversityImages, (0, university_validator_1.validateUniversity)(university_validator_1.updateUniversitySchema), university_controller_1.updateUniversity);
router.delete("/:id", (0, auth_middleware_1.authenticate)(), university_controller_1.deleteUniversity);
exports.default = router;
