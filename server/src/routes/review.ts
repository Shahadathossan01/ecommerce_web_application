import reviewControllers from "@src/api/v1/review";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import sharedValiations from "@src/validations/shared";
import { Router } from "express";

const router = Router();

router.get(
  "/reviews",
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
  reviewControllers.findAllItems as unknown as any
);

router.patch(
  "/reviews/:id",
  authenticate,
  authorize(["admin"]),
  validate(sharedValiations.pathSchema, "params"),
  reviewControllers.updateItem
);

export default router;
