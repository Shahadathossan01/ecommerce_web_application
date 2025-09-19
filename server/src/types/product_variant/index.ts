import productVariantValidations from "@src/validations/product_variants";
import { Document, Types } from "mongoose";
import z from "zod";

export interface IProductVariant extends Document {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  color: string;
  size: string;
  status: "active" | "inactive";
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProductVariantInput = z.infer<
  typeof productVariantValidations.productVariantSchema
>;
