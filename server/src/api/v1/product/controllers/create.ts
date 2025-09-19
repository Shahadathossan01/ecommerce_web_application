import productServices from "@src/lib/product";
import { MutateResponse } from "@src/types/common";
import { IProduct, IProductInput } from "@src/types/product";
import { Request, Response, NextFunction } from "express";

const create = async (
  req: Request<{}, {}, IProductInput>,
  res: Response<MutateResponse<IProduct>>,
  next: NextFunction
) => {
  const {
    category_id,
    description,
    discount,
    image,
    mrp,
    name,
    selling_price,
    status,
  } = req.body;

  try {
    const product = await productServices.create({
      category_id,
      description,
      discount,
      image,
      mrp,
      name,
      selling_price,
      status,
    });

    const response = {
      code: 201,
      message: "Product created successfully",
      data: product,
      links: {
        self: `/api/v1/products/${product._id}`,
      },
    };

    res.status(201).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default create;
