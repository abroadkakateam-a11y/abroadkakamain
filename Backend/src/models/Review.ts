import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
    university: mongoose.Types.ObjectId;
    name: string;
    image: string;
    rating: number;
    review: string;
}

const ReviewSchema = new Schema<IReview>({
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    name: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
