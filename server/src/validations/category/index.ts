import { z } from "zod";

const categoryCreateSchema = z.object({
  name: z.string().min(3, "name too short").max(30, "name too long").trim(),
});

const categoryValidations = {
  categoryCreateSchema,
};

export default categoryValidations;
