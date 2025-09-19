import { Schema, model } from "mongoose";
import { IProduct } from "@src/types/product";

const productSchema = new Schema<IProduct>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    mrp: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
