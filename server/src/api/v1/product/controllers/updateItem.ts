import productServices from "@src/lib/product";
import { IPath, MutateResponse } from "@src/types/common";
import { IProduct, IProductInput } from "@src/types/product";
import { Request, Response, NextFunction } from "express";
const updateItem = async (
  req: Request<IPath, {}, IProductInput>,
  res: Response<MutateResponse<IProduct>>,
  next: NextFunction
) => {
  const { id } = req.params;
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
    const product = await productServices.updateItem({
      id,
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
      code: 200,
      message: "Product updated successfully",
      data: product,
      links: {
        self: `/api/v1/products/${product._id}`,
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default updateItem;
