import productVariantServices from "@src/lib/productVariant";
import { IPath, MutateResponse } from "@src/types/common";
import { ProductVariantInput } from "@src/types/product_variant";
import { Request, Response, NextFunction } from "express";

const updateItem = async (
  req: Request<IPath, {}, ProductVariantInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  const { id } = req.params;
  const { color, images, product, size } = req.body;

  try {
    const productVariant = await productVariantServices.updateItem({
      color,
      id,
      images,
      product,
      size,
    });

    const response = {
      code: 200,
      message: "Product variant updated successfully",
      data: productVariant,
      links: {
        self: `/api/v1/product_variants/${productVariant._id}`,
        product: `/api/v1/product/${productVariant.product}`,
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default updateItem;
