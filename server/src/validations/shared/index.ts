import mongoose from "mongoose";
import z from "zod";

export const pathSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),
});

const sharedValiations = {
  pathSchema,
};

export default sharedValiations;
