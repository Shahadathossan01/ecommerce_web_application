import { z } from "zod";
import mongoose from "mongoose";
const categoryCreateSchema = z.object({
  name: z.string().min(3, "name too short").max(30, "name too long").trim(),
});
const categoryUpdateSchema = z.object({
  name: z.string().min(3, "name too short").max(30, "name too long").trim(),
});

export const getCategoriesQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0, { message: "Limit must be greater than 0" }),

  sort_type: z.enum(["asc", "desc"]).optional().default("desc"),

  sort_by: z.enum(["updatedAt", "name"]).optional().default("updatedAt"),

  search: z.string().optional().default(""),
});

export const updateCategoryParamsSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),
});

const categoryValidations = {
  categoryCreateSchema,
  getCategoriesQuerySchema,
  updateCategoryParamsSchema,
  categoryUpdateSchema,
};

export default categoryValidations;
