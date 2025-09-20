import { z } from "zod";

const couponSchema = z
  .object({
    discount_percentage: z
      .number()
      .int()
      .min(0, { message: "discount_percentage must be >= 0" })
      .max(100, { message: "discount_percentage must be <= 100" }),

    coupon_code: z
      .string()
      .min(4, { message: "coupon_code cannot be empty" })
      .max(6, { message: "coupon_code too long" }),

    min_shopping_amount: z
      .number()
      .nonnegative({ message: "min_shopping_amount must be >= 0" }),

    validity: z
      .string()
      .refine((s) => !Number.isNaN(Date.parse(s)), {
        message: "validity must be a valid ISO date string",
      })
      .transform((s) => new Date(s)),

    status: z.enum(["active", "inactive"]).default("active"),
  })
  .strict();

const couponValidations = {
  couponSchema,
};

export default couponValidations;
