import { GetResponse, IQuery } from "@src/types/common";
import { Request, Response, NextFunction } from "express";

import defaults from "@src/config/defaults";
import productVariantServices from "@src/lib/productVariant";
import query from "@src/utils/query";
import { IProductVariant } from "@src/types/product_variant";

const findAllItems = async (
  req: Request<
    {},
    {},
    {},
    Pick<
      IQuery,
      "page" | "limit" | "sort_type" | "sort_by" | "color" | "size" | "status"
    >
  >,
  res: Response<GetResponse<IProductVariant[]>>,
  next: NextFunction
) => {
  const page = req.query.page ?? defaults.page;
  const limit = req.query.limit ?? defaults.limit;
  const sort_type = req.query.sort_type ?? defaults.sort_type;
  const sort_by = req.query.sort_by ?? defaults.sort_by;
  const color = req.query.color ?? defaults.color;
  const size = req.query.size ?? defaults.size;
  const status = req.query.status ?? defaults.status;

  try {
    const productVariant = await productVariantServices.findAllItems({
      color,
      limit,
      page,
      size,
      sort_by,
      sort_type,
      status,
    });

    const data = query.getTransformedItems({
      items: productVariant,
      selection: [
        "_id",
        "product",
        "color",
        "size",
        "status",
        "image",
        "createdAt",
        "updatedAt",
      ],
      links: [
        {
          path: "/api/v1/product_variants",
          key: "self",
          property: "_id",
        },
        {
          path: "/api/v1/products",
          key: "product",
          property: "product",
        },
      ],
    });

    const totalItems = await productVariantServices.count({
      color,
      size,
      status,
    });
    const pagination = query.getPagination({ totalItems, limit, page });

    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    const response = {
      data,
      pagination,
      links,
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default findAllItems;
