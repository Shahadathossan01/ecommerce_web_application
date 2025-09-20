import { ICoupon } from "@src/types/coupon";
import { Schema, model } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

const couponSchema = new Schema<ICoupon>(
  {
    discount_percentage: {
      type: Number,
      required: true,
    },
    coupon_code: {
      type: String,
      required: true,
    },
    min_shopping_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = model<ICoupon>("Coupon", couponSchema);

export default Coupon;
