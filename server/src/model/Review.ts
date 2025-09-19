import { IReview } from "@src/types/review";
import { Schema, model } from "mongoose";

const reviewSchema = new Schema<IReview>(
  {
    title: {
      type: String,
      required: true,
    },
    ratting: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product_id: 1 });

const Review = model<IReview>("Review", reviewSchema);

export default Review;
