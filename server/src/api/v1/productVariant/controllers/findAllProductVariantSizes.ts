import productVariantServices from "@src/lib/productVariant";
import { Request, Response, NextFunction } from "express";

const findAllProductVariantSizes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productVariantSizes =
      await productVariantServices.findAllProductVariantSizes();

    const response = {
      data: productVariantSizes,
      links: {
        self: "/api/v1/product_variants/sizes",
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default findAllProductVariantSizes;
