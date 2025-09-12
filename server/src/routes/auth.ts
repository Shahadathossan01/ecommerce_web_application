import { Router } from "express";
const router = Router();

router.post("/register", async (req, res) => {
  res.status(200).json({ message: "checked!" });
});

export default router;
