import categoryControllers from "@src/api/v1/category";
import validate from "@src/middleware/validate";
import categoryValidations from "@src/validations/category";
import { Router } from "express";

const router = Router();

router.post(
  "/categories",
  validate(categoryValidations.categoryCreateSchema),
  categoryControllers.create
);

export default router;
