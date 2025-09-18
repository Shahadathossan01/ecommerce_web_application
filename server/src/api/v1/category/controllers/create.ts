import categoryService from "@src/lib/category";
import { CategoryInput, ICategory } from "@src/types/category";
import { MutateResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";

const create = async (
  req: Request<{}, {}, CategoryInput>,
  res: Response<MutateResponse<ICategory>>,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const category = await categoryService.create({ name });

    const response = {
      code: 201,
      message: "Category created successfully",
      data: category,
      links: {
        self: `/api/v1/categories/${category._id}`,
      },
    };

    res.status(201).json(response);
  } catch (e: unknown) {
    console.log(e);
    next(e);
  }
};

export default create;
