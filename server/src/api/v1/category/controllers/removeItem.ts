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
    const deletedCategory = await categoryService.removeItem({ id });

    console.log("deleted", deletedCategory);
    if (deletedCategory) {
      const payload = {
        code: 204,
        message: "Category deleted successfully!",
      };

      res.status(204).json(payload);
    }
  } catch (e: unknown) {
    next(e);
  }
};

export default removeItem;
