import couponValidations from "@src/validations/coupon";
import { Document, Types } from "mongoose";
import z from "zod";

export interface ICoupon extends Document {
  _id: Types.ObjectId;
  discount_percentage: number;
  coupon_code: string;
  min_shopping_amount: number;
  validity: Date;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type ICouponInput = z.infer<typeof couponValidations.couponSchema>;
