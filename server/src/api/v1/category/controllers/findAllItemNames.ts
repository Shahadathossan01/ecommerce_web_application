import categoryService from "@src/lib/category";
import { ICategory } from "@src/types/category";
import { GetResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";

const findAllItemNames = async (
  req: Request,
  res: Response<GetResponse<ICategory[]>>,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.findAllItemNames();

    const response = {
      data: categories,
      links: {
        self: "/api/v1/categories/names",
      },
    };
    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default findAllItemNames;
