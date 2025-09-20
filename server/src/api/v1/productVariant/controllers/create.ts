import productVariantServices from "@src/lib/productVariant";
import { MutateResponse } from "@src/types/common";
import { ProductVariantInput } from "@src/types/product_variant";
import { Request, Response, NextFunction } from "express";
const create = async (
  req: Request<{}, {}, ProductVariantInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  const { color, images, product, size } = req.body;
  try {
    const productVariant = await productVariantServices.create({
      color,
      images,
      product,
      size,
    });

    const response = {
      code: 201,
      message: "Product variant created successfully",
      data: productVariant,
      links: {
        self: `/api/v1/product_variants/${productVariant._id}`,
        product: `/api/v1/products/${productVariant.product}`,
      },
    };

    res.status(201).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default create;
