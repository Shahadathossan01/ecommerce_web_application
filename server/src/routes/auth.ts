import error from "@src/utils/error";
import { Router } from "express";
const router = Router();

router.post("/register", async (req, res) => {
  throw 123;
});

export default router;
