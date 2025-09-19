import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
import categoryRoutes from "./category";
import productRoutes from "./product";
// import reviewRoutes from "./review";

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1", categoryRoutes);
router.use("/api/v1", productRoutes);
// router.use("/api/v1", reviewRoutes);

export default router;
