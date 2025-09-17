import authValidations from "@src/validations/auth";
import authControllers from "../api/v1/auth";
import validate from "@src/middleware/validate";
import { Router } from "express";
import forgotPasswordLimiter from "@src/utils/forgotPasswordLimiter";
import resetPassword from "@src/api/v1/auth/controllers/resetPassword";
const router = Router();

router.post(
  "/register",
  validate(authValidations.registerSchema),
  authControllers.register
);
router.post(
  "/verifyRegisterOtp",
  validate(authValidations.verifyRegisterOtpSchema),
  authControllers.verifyRegisterOtp
);
router.post(
  "/login",
  validate(authValidations.loginSchema),
  authControllers.login
);
router.post(
  "/resendOtp",
  validate(authValidations.resendOtpSchema),
  authControllers.resendOtp
);
router.post(
  "/forgotPassword",
  validate(authValidations.forgotPasswordSchema),
  forgotPasswordLimiter,
  authControllers.forgotPassword
);
router.post(
  "/verifyResetOtp",
  validate(authValidations.verifyResetOtpSchema),
  authControllers.verifyResetOtp
);
router.post(
  "/resetPassword",
  validate(authValidations.resetPasswordSchema),
  authControllers.resetPassword
);

export default router;
