import express from "express";
import {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  uploadUniversityImages,
} from "../controllers/university.controller";

import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer";

const router = express.Router();

// Get all universities (public access)
router.get("/", getUniversities);

// Get single university (public access)
router.get("/:id", getUniversityById);
router.post(
  "/",
  authenticate(["admin"]),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "photos", maxCount: 20 }
  ]),
  (req, res, next) => {
    console.log("Body:", req.body);   // text fields
    console.log("Files:", req.files); // uploaded files
    next();
  },
  createUniversity
);

// Update university (admin only)
router.put(
  "/:id",
  authenticate(["admin"]),
  uploadUniversityImages,
  updateUniversity
);

// Delete university (admin only)
router.delete("/:id", authenticate(["admin"]), deleteUniversity);

export default router;