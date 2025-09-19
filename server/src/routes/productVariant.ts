import productVariantControllers from "@src/api/v1/productVariant";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import productVariantValidations from "@src/validations/product_variants";
import { Router } from "express";

const router = Router();

router.post(
  "/product_variants",
  authenticate,
  authorize(["admin"]),
  validate(productVariantValidations.productVariantSchema),
  productVariantControllers.create
);

export default router;
