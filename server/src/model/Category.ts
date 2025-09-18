import { ICategory } from "@src/types/category";
import { Schema, model } from "mongoose";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
