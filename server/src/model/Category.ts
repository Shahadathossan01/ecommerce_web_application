import { ICategory } from "@src/types/category";
import { Schema, model } from "mongoose";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
