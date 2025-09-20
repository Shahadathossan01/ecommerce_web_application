import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
import categoryRoutes from "./category";
import productRoutes from "./product";
import productVariantRoutes from "./productVariant";
import reviewRoutes from "./review";
import couponRoutes from "./coupon";

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1", categoryRoutes);
router.use("/api/v1", productRoutes);
router.use("/api/v1", productVariantRoutes);
router.use("/api/v1", reviewRoutes);
router.use("/api/v1", couponRoutes);

export default router;
