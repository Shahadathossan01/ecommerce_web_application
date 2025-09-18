import mongoose from "mongoose";
import { z } from "zod";

export const productSchema = z.object({
  category_id: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB ObjectId",
    }),

  name: z
    .string({ message: "Product name is required" })
    .min(1, "Product name cannot be empty"),

  mrp: z
    .number({ message: "MRP must be a number" })
    .positive("MRP must be greater than 0"),

  selling_price: z
    .number({ message: "Selling price must be a number" })
    .nonnegative("Selling price must be >= 0"),

  discount: z
    .number({ message: "Discount must be a number" })
    .min(0, "Discount must be >= 0")
    .max(100, "Discount cannot exceed 100")
    .default(0),

  description: z.string().optional().default(""),

  image: z.string({ message: "Image URL is required" }),

  status: z.enum(["active", "inactive"]).default("inactive"),
});

const productValidations = {
  productSchema,
};

export default productValidations;
