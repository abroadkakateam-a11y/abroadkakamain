import { Schema, model, Document } from 'mongoose';
import { ICountry } from '../interfaces/country.interface';

const FlagImageSchema = new Schema(
    {
        public_id: { type: String },
        url: { type: String }
    },
    { _id: false }
);

const CountrySchema = new Schema<ICountry & Document>(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
        currency: { type: String, required: true },
        continent: { type: String, required: true },
        description: { type: String },
        flagImage: FlagImageSchema
    },
    { timestamps: true }
);

export default model<ICountry & Document>('Country', CountrySchema);
