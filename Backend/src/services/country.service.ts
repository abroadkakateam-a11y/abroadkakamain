import Country from "../models/Country.model";
import { CountryCreateInput, CountryUpdateInput } from "../types/country.types";
import APIFeatures from "../utils/apiFeatures";
import { sendSuccess } from "../utils/response.util";
import { AppError } from "../utils/appError";

class CountryService {
  public async getAllCountries(query: any) {
    const features = new APIFeatures(Country.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const countries = await features.query;
    return countries;
  }

  public async getCountry(id: string) {
    const country = await Country.findById(id);

    if (!country) {
      throw new AppError("No country found with that ID", 404);
    }
  }

  public async createCountry(countryData: CountryCreateInput) {
    const newCountry = await Country.create(countryData);
    return newCountry;
  }

  public async updateCountry(id: string, updateData: CountryUpdateInput) {
    const country = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!country) {
      throw new AppError("No country found with that ID", 404);
    }

    return country;
  }

  public async deleteCountry(id: string) {
    const country = await Country.findByIdAndDelete(id);

    if (!country) {
      throw new AppError("No country found with that ID", 404);
    }

    return country;
  }
}

export default CountryService;
