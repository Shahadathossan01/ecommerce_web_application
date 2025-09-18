import categoryService from "@src/lib/category";
import { CategoryParams } from "@src/types/category";
import { Request, Response, NextFunction } from "express";

const removeItem = async (
  req: Request<CategoryParams>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await categoryService.removeItem({ id });
    res.status(204).end();
  } catch (e: unknown) {
    next(e);
  }
};

export default removeItem;
