import mongoose, { Schema, Document } from "mongoose";

interface FeeStructure {
  year: number;
  tuition: number;
  hostel: number;
}

interface Highlight {
  label: string;
  value: string;
  icon?: string;
}

interface Review {
  name: string;
  image: string;
  rating: number;
  review: string;
}

interface FAQ {
  q: string;
  a: string;
}

export interface IUniversity extends Document {
  name: string;
  university: string;
  country: mongoose.Types.ObjectId;
  location: string;
  tagline: string;
  coverImage: string;
  coverImagePublicId?: string; // For Cloudinary management
  logo: string;
  logoPublicId?: string; // For Cloudinary management
  established: number;
  highlights: Highlight[];
  about: string;
  programs: string[];
  duration: string;
  medium: string;
  gpaRequired: string;
  feesUSD: string;
  feesINR: string;
  feeStructure: FeeStructure[];
  hostelCost: string;
  approvedBy: string[];
  facilities: string[];
  eligibility: string[];
  admissionSteps: string[];
  documents: string[];
  reviews: Review[];
  faqs: FAQ[];
  comparison: mongoose.Schema.Types.Mixed[];
}

const UniversitySchema = new Schema<IUniversity>({
  name: { type: String, required: true },
  university: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  location: String,
  tagline: String,
  coverImage: String,
  coverImagePublicId: String, // For Cloudinary image management
  logo: String,
  logoPublicId: String, // For Cloudinary image management
  established: Number,

  highlights: [
    {
      label: String,
      value: String,
      icon: String,
    },
  ],

  about: String,
  programs: [String],
  duration: String,
  medium: String,
  gpaRequired: String,
  feesUSD: String,
  feesINR: String,
  feeStructure: [
    {
      year: Number,
      tuition: Number,
      hostel: Number,
    },
  ],
  hostelCost: String,
  approvedBy: [String],
  facilities: [String],
  eligibility: [String],
  admissionSteps: [String],
  documents: [String],

  reviews: [
    {
      name: String,
      image: String,
      rating: Number,
      review: String,
    },
  ],

  faqs: [
    {
      q: String,
      a: String,
    },
  ],

  comparison: [Schema.Types.Mixed],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Index for better search performance
UniversitySchema.index({ name: 'text', university: 'text', location: 'text' });
UniversitySchema.index({ country: 1 });
UniversitySchema.index({ programs: 1 });

export default mongoose.model<IUniversity>("University", UniversitySchema);