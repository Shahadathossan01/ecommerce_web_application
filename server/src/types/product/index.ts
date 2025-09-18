import { productSchema } from "@src/validations/product";
import { Document, Types } from "mongoose";
import z from "zod";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  category_id: Types.ObjectId;
  name: string;
  mrp: number;
  selling_price: number;
  discount: number;
  description: string;
  image: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export type IProductInput = z.infer<typeof productSchema>;
