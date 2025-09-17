import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
import categoryRoutes from "./category";

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1", categoryRoutes);

export default router;
