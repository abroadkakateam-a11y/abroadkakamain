import express from 'express';
import {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
  uploadCountryFlag
} from '../controllers/country.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllCountries);
router.get('/:id', getCountry);

// Protected routes (require authentication)
router.post(
  '/',
  authenticate(['admin']), // Only admin can create countries
  uploadCountryFlag,
  createCountry
);

router.patch(
  '/:id',
  authenticate(['admin']), // Only admin can update countries
  uploadCountryFlag,
  updateCountry
);

router.delete(
  '/:id',
  authenticate(['admin']), // Only admin can delete countries
  deleteCountry
);

export default router;
