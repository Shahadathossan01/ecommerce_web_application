import productVariantControllers from "@src/api/v1/productVariant";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import productVariantValidations from "@src/validations/product_variants";
import sharedValiations from "@src/validations/shared";
import { Router } from "express";

const router = Router();

router.post(
  "/product_variants",
  authenticate,
  authorize(["admin"]),
  validate(productVariantValidations.productVariantSchema),
  productVariantControllers.create
);

router.get(
  "/product_variants",
  authenticate,
  authorize(["user"]),
  validate(
    sharedValiations.querySchema
      .pick({
        page: true,
        limit: true,
        sort_by: true,
        sort_type: true,
        color: true,
        size: true,
        status: true,
      })
      .partial(),

    "query"
  ),
  productVariantControllers.findAllItems as unknown as any
);

router.patch(
  "/product_variants/:id",
  authenticate,
  authorize(["admin"]),
  validate(productVariantValidations.productVariantSchema),
  productVariantControllers.updateItem
);

router.delete(
  "/product_variants/:id",
  authenticate,
  authorize(["admin"]),
  validate(sharedValiations.pathSchema, "params"),
  productVariantControllers.removeItem
);

router.get(
  "/product_variants/colors",
  productVariantControllers.findAllProductVariantColors
);
router.get(
  "/product_variants/sizes",
  productVariantControllers.findAllProductVariantSizes
);

export default router;
