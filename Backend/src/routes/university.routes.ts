// routes/university.routes.ts
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

/**
 * @swagger
 * tags:
 *   name: Universities
 *   description: University management with image upload support
 */

/**
 * @swagger
 * /api/universities:
 *   get:
 *     summary: Get all universities with pagination and filtering
 *     tags: [Universities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "10"
 *         description: Items per page
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country ID
 *       - in: query
 *         name: program
 *         schema:
 *           type: string
 *         description: Filter by program name
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query (name, university, or location)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "name:asc"
 *         description: Sort field and direction (field:asc or field:desc)
 *     responses:
 *       200:
 *         description: List of universities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: number
 *                 data:
 *                   type: object
 *                   properties:
 *                     universities:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/University'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: number
 *                         limit:
 *                           type: number
 *                         total:
 *                           type: number
 *                         totalPages:
 *                           type: number
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
router.get("/", validateQuery, getUniversities);

/**
 * @swagger
 * /api/universities/{id}:
 *   get:
 *     summary: Get a university by ID
 *     tags: [Universities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: University ID
 *     responses:
 *       200:
 *         description: University data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     university:
 *                       $ref: '#/components/schemas/University'
 *       400:
 *         description: Invalid university ID format
 *       404:
 *         description: University not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getUniversityById);

/**
 * @swagger
 * /api/universities:
 *   post:
 *     summary: Create a new university with image uploads (Admin only)
 *     tags: [Universities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               university:
 *                 type: string
 *               country:
 *                 type: string
 *                 description: Country ObjectId
 *               location:
 *                 type: string
 *               tagline:
 *                 type: string
 *               established:
 *                 type: number
 *               about:
 *                 type: string
 *               programs:
 *                 type: array
 *                 items:
 *                   type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: University logo image
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: University cover image
 *               reviewImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Review images (max 10)
 *             required:
 *               - name
 *               - university
 *               - country
 *     responses:
 *       201:
 *         description: University created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     university:
 *                       $ref: '#/components/schemas/University'
 *       400:
 *         description: Invalid input data or file upload error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       409:
 *         description: University already exists
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authenticate(["admin"]), // Only admin can create countries,
  uploadUniversityImages,
  validateUniversity(createUniversitySchema),
  createUniversity
);

/**
 * @swagger
 * /api/universities/{id}:
 *   put:
 *     summary: Update a university with image uploads (Admin only)
 *     tags: [Universities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: University ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               university:
 *                 type: string
 *               country:
 *                 type: string
 *                 description: Country ObjectId
 *               location:
 *                 type: string
 *               tagline:
 *                 type: string
 *               established:
 *                 type: number
 *               about:
 *                 type: string
 *               programs:
 *                 type: array
 *                 items:
 *                   type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: University logo image
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: University cover image
 *               reviewImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Review images (max 10)
 *     responses:
 *       200:
 *         description: University updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     university:
 *                       $ref: '#/components/schemas/University'
 *       400:
 *         description: Invalid input data, university ID format, or file upload error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       404:
 *         description: University not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  authenticate(),
  uploadUniversityImages,
  validateUniversity(updateUniversitySchema),
  updateUniversity
);

/**
 * @swagger
 * /api/universities/{id}:
 *   delete:
 *     summary: Delete a university and its images (Admin only)
 *     tags: [Universities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: University ID
 *     responses:
 *       204:
 *         description: University deleted successfully
 *       400:
 *         description: Invalid university ID format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 *       404:
 *         description: University not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authenticate(), deleteUniversity);

export default router;
