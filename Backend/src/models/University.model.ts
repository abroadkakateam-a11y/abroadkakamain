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

interface Photo {
  url: string;
  publicId?: string;
  caption?: string;
}

interface LocationMaps {
  latitude?: number;
  longitude?: number;
  googleMapEmbedUrl?: string;
}

export interface IUniversity extends Document {
  name: string;
  university: string;
  country: mongoose.Types.ObjectId;
  location: string;
  locationmaps?: LocationMaps; // Stores either coordinates or embed link
  tagline: string;
  coverImage: string;
  coverImagePublicId?: string;
  logo: string;
  logoPublicId?: string;
  photos: Photo[];
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

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true },
    university: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    location: { type: String, required: true },

    // You can store coordinates or just embed link
    locationmaps: {
      latitude: { type: Number },
      longitude: { type: Number },
      googleMapEmbedUrl: { type: String }
    },

    tagline: { type: String },
    coverImage: { type: String },
    coverImagePublicId: { type: String },
    logo: { type: String },
    logoPublicId: { type: String },

    photos: [
      {
        url: { type: String },
        publicId: { type: String },
        caption: { type: String }
      }
    ],

    established: { type: Number },
    highlights: [
      {
        label: { type: String },
        value: { type: String },
        icon: { type: String }
      }
    ],

    about: { type: String },
    programs: [{ type: String }],
    duration: { type: String },
    medium: { type: String },
    gpaRequired: { type: String },
    feesUSD: { type: String },
    feesINR: { type: String },

    feeStructure: [
      {
        year: { type: Number },
        tuition: { type: Number },
        hostel: { type: Number }
      }
    ],

    hostelCost: { type: String },
    approvedBy: [{ type: String }],
    facilities: [{ type: String }],
    eligibility: [{ type: String }],
    admissionSteps: [{ type: String }],
    documents: [{ type: String }],

    reviews: [
      {
        name: { type: String },
        image: { type: String },
        rating: { type: Number },
        review: { type: String }
      }
    ],

    faqs: [
      {
        q: { type: String },
        a: { type: String }
      }
    ],

    comparison: [Schema.Types.Mixed]
  },
  { timestamps: true }
);

// Indexes for search
UniversitySchema.index({ name: "text", university: "text", location: "text" });
UniversitySchema.index({ country: 1 });
UniversitySchema.index({ programs: 1 });

export default mongoose.model<IUniversity>("University", UniversitySchema);
