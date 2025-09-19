import { IProductVariant } from "@src/types/product_variant";
import { Schema, model } from "mongoose";

const productVariantSchema = new Schema<IProductVariant>(
  {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductVariant = model<IProductVariant>(
  "ProductVariant",
  productVariantSchema
);

export default ProductVariant;
