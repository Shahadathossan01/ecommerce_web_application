import couponControllers from "@src/api/v1/coupon";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import couponValidations from "@src/validations/coupon";
import sharedValiations from "@src/validations/shared";
import { Router } from "express";

const router = Router();

router.post(
  "/coupons",
  authenticate,
  authorize(["admin"]),
  validate(couponValidations.couponSchema),
  couponControllers.create
);

router.get(
  "/coupons",
  authenticate,
  authorize(["admin"]),
  validate(
    sharedValiations.querySchema.pick({
      page: true,
      limit: true,
      sort_by: true,
      sort_type: true,
      search: true,
    }),

    "query"
  ),
  couponControllers.findAllItems as unknown as any
);

router.patch(
  "/coupons/:id",
  authenticate,
  authorize(["admin"]),
  validate(sharedValiations.pathSchema, "params"),
  validate(couponValidations.couponSchema),
  couponControllers.updateItem
);

export default router;
