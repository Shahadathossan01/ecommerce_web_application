import { z } from "zod";

export const reviewSchema = z.object({
  title: z
    .string({ message: "title is required" })
    .min(1, "title cannot be empty"),

  ratting: z
    .number({ message: "ratting must be a number" })
    .positive("ratting must be greater than 0"),

  review: z
    .string({ message: "review is required" })
    .min(1, "review cannot be empty"),
});

const reviewValidations = {
  reviewSchema,
};

export default reviewValidations;
