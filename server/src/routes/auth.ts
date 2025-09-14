import authValidations from "@src/validations/auth";
import authController from "../api/v1/auth";
import validate from "@src/middleware/validate";
import { Router } from "express";
const router = Router();

router.post(
  "/register",
  validate(authValidations.registerSchema),
  authController.register
);

export default router;
