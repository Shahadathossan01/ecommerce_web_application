import categoryControllers from "@src/api/v1/category";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import categoryValidations from "@src/validations/category";
import { Router } from "express";

const router = Router();

router.post(
  "/categories",
  authenticate,
  authorize(["admin"]),
  validate(categoryValidations.categoryCreateSchema),
  categoryControllers.create
);

export default router;
