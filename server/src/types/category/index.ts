import { z } from "zod";

import { Document, Types } from "mongoose";
import categoryValidations from "@src/validations/category";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryInput = z.infer<
  typeof categoryValidations.categoryCreateSchema
>;
export type CategoryQuery = z.infer<
  typeof categoryValidations.getCategoriesQuerySchema
>;

export type CategoryParams = z.infer<
  typeof categoryValidations.categoryParamsSchema
>;

export type UpdateCategoryBody = z.infer<
  typeof categoryValidations.categoryUpdateSchema
>;
