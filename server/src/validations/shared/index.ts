import mongoose from "mongoose";
import z from "zod";

export const pathSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),
});

export const querySchema = z.object({
  page: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  limit: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0, { message: "Limit must be greater than 0" }),

  sort_type: z.enum(["asc", "desc"]).default("desc"),

  sort_by: z.enum(["updatedAt", "name"]).default("updatedAt"),

  search: z.string({ message: "search query is required" }),
});

const sharedValiations = {
  pathSchema,
  querySchema,
};

export default sharedValiations;
