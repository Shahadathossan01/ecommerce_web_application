import categoryService from "@src/lib/category";
import {
  ICategory,
  UpdateCategoryBody,
  UpdateCategoryParams,
} from "@src/types/category";
import { GetResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";
const updateItem = async (
  req: Request<UpdateCategoryParams, {}, UpdateCategoryBody>,
  res: Response<GetResponse>,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category: ICategory = await categoryService.updateItem({ id, name });

    const response = {
      code: 200,
      message: "Category updated successfully",
      data: category,
      links: {
        self: `/api/v1/categories/${category._id}`,
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default updateItem;
