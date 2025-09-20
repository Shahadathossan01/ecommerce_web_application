import couponControllers from "@src/api/v1/coupon";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import couponValidations from "@src/validations/coupon";
import { Router } from "express";

const router = Router();

router.post(
  "/coupons",
  authenticate,
  authorize(["admin"]),
  validate(couponValidations.couponSchema),
  couponControllers.create
);

export default router;
