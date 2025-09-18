import productControllers from "@src/api/v1/product";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import productValidations from "@src/validations/product";
import { Router } from "express";

const router = Router();

router.post(
  "/products",
  authenticate,
  authorize(["admin"]),
  validate(productValidations.productCreateSchema),
  productControllers.create
);

export default router;
