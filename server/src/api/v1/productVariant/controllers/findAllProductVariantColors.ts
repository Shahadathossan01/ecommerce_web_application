import productVariantServices from "@src/lib/productVariant";
import { Request, Response, NextFunction } from "express";

const findAllProductVariantColors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productVariantColors =
      await productVariantServices.findAllProductVariantColors();

    const response = {
      data: productVariantColors,
      links: {
        self: "/api/v1/product_variants/colors",
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default findAllProductVariantColors;
