import productControllers from "@src/api/v1/product";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import productValidations from "@src/validations/product";
import reviewValidations from "@src/validations/review";
import sharedValiations from "@src/validations/shared";
import { RequestHandler, Router } from "express";

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

//TODO -> also delete PRODUCT_VARIANT
router.delete(
  "/products/:id",
  authenticate,
  authorize(["admin"]),
  validate(sharedValiations.pathSchema, "params"),
  productControllers.removeItem
);

router.post(
  "/products/:id/reviews",
  authenticate,
  authorize(["user"]),
  validate(sharedValiations.pathSchema, "params"),
  validate(reviewValidations.reviewSchema),
  productControllers.createReviewByProductId as RequestHandler
);

export default router;
