import express from "express";
import {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  uploadUniversityImages,
} from "../controllers/university.controller";
import {
  validateUniversity,
  validateQuery,
  createUniversitySchema,
  updateUniversitySchema,
} from "../validators/university.validator";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", validateQuery, getUniversities);

router.get("/:id", getUniversityById);

router.post(
  "/",
  authenticate(["admin"]), // Only admin can create countries,
  uploadUniversityImages,
  validateUniversity(createUniversitySchema),
  createUniversity
);

router.put(
  "/:id",
  authenticate(),
  uploadUniversityImages,
  validateUniversity(updateUniversitySchema),
  updateUniversity
);

router.delete("/:id", authenticate(), deleteUniversity);

export default router;
