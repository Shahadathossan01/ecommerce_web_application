import categoryControllers from "@src/api/v1/category";
import authenticate from "@src/middleware/authenticate";
import authorize from "@src/middleware/authorize";
import validate from "@src/middleware/validate";
import categoryValidations from "@src/validations/category";
import { RequestHandler, Router } from "express";

const router = Router();

router.post(
  "/categories",
  authenticate,
  authorize(["admin"]),
  validate(categoryValidations.categoryCreateSchema),
  categoryControllers.create
);

router.get(
  "/categories",
  validate(categoryValidations.getCategoriesQuerySchema, "query"),
  categoryControllers.findAllItems as unknown as RequestHandler
);

router.patch(
  "/categories/:id",
  authenticate,
  authorize(["admin"]),
  validate(categoryValidations.categoryParamsSchema, "params"),
  validate(categoryValidations.categoryUpdateSchema),
  categoryControllers.updateItem
);

router.delete(
  "/categories/:id",
  authenticate,
  authorize(["admin"]),
  validate(categoryValidations.categoryParamsSchema, "params"),
  categoryControllers.removeItem
);

router.get("/categories/names", categoryControllers.findAllItemNames);

export default router;
