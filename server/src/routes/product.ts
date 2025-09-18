import productControllers from "@src/api/v1/product";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import productValidations from "@src/validations/product";
import sharedValiations from "@src/validations/shared";
import { Router } from "express";

const router = Router();
//TODO GET PRODUCT | GET PRODUCT BY ID |
router.post(
  "/products",
  authenticate,
  authorize(["admin"]),
  validate(productValidations.productSchema),
  productControllers.create
);

router.patch(
  "/products/:id",
  authenticate,
  authorize(["admin"]),
  validate(sharedValiations.pathSchema, "params"),
  validate(productValidations.productSchema),
  productControllers.updateItem
);

export default router;
