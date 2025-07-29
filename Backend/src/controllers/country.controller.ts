import { Request, Response, NextFunction } from "express";
import CountryService from "../services/country.service";
import { CountryCreateInput, CountryUpdateInput } from "../types/country.types";
import { uploadSingleImage } from "../config/multer";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";
import { AppError } from "../utils/appError";
import {
  countryCreateSchema,
  countryUpdateSchema,
} from "../validators/country.validator";

const countryService = new CountryService();

export const getAllCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await countryService.getAllCountries(req.query);
    res.status(200).json({
      status: "success",
      results: countries.length,
      data: { countries },
    });
  } catch (err) {
    next(err);
  }
};

export const getCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const country = await countryService.getCountry(req.params.id);
    res.status(200).json({
      status: "success",
      data: { country },
    });
  } catch (err) {
    next(err);
  }
};

export const createCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let countryData = req.body;

    if (req.file) {
      const result = (await uploadToCloudinary(
        req.file,
        "countries/flags"
      )) as { public_id: string; secure_url: string };
      countryData.flagImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const parsedData = countryCreateSchema.parse(countryData);

    const newCountry = await countryService.createCountry(parsedData);
    res.status(201).json({
      status: "success",
      data: { country: newCountry },
    });
  } catch (err) {
    next(err);
  }
};

export const updateCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData: CountryUpdateInput = req.body;

    if (req.file) {
      const country = await countryService.getCountry(req.params.id);
      if (country.flagImage?.public_id) {
        await deleteFromCloudinary(country.flagImage.public_id);
      }

      const result = (await uploadToCloudinary(
        req.file,
        "countries/flags"
      )) as { public_id: string; secure_url: string };
      updateData.flagImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedCountry = await countryService.updateCountry(
      req.params.id,
      updateData
    );
    res.status(200).json({
      status: "success",
      data: { country: updatedCountry },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const country = await countryService.getCountry(req.params.id);
    if (country.flagImage?.public_id) {
      await deleteFromCloudinary(country.flagImage.public_id);
    }

    await countryService.deleteCountry(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadCountryFlag = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadSingleImage("flag")(req, res, (err: any) => {
    if (err) {
      return next(new AppError(err.message, 400));
    }
    next();
  });
};
