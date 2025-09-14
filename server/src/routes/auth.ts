import { registerSchema } from "@src/api/v1/auth/validation";
import authController from "../api/v1/auth";
import validate from "@src/middleware/validate";
import { Router } from "express";
const router = Router();

router.post("/register", validate(registerSchema), authController.register);

export default router;
