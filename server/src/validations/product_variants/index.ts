import mongoose from "mongoose";
import { z } from "zod";

const productVariantSchema = z.object({
  product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),
  color: z.string().min(1, { message: "Color is required" }),
  size: z.string().min(1, { message: "Size is required" }),
  images: z
    .array(z.string().url({ message: "Each image must be a valid URL" }))
    .min(1, { message: "At least one image is required" }),
});

const productVariantValidations = {
  productVariantSchema,
};

export default productVariantValidations;
