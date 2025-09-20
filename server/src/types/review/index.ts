import reviewValidations from "@src/validations/review";
import sharedValiations from "@src/validations/shared";
import { Document, Types } from "mongoose";
import z from "zod";

export interface IReview extends Document {
  _id: Types.ObjectId;
  product_id: Types.ObjectId;
  user_id: Types.ObjectId;
  title: string;
  ratting: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export type IReviewInput = z.infer<typeof reviewValidations.reviewSchema>;

export type IReviewQuery = z.infer<typeof sharedValiations.querySchema>;
