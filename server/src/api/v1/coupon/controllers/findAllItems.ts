import { GetResponse, IQuery } from "@src/types/common";
import { ICoupon } from "@src/types/coupon";
import { Request, Response, NextFunction } from "express";
import defaults from "@src/config/defaults";
import couponServices from "@src/lib/coupon";
import query from "@src/utils/query";

const findAllItems = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response<GetResponse<ICoupon[]>>,
  next: NextFunction
) => {
  const page = req.query.page ?? defaults.page;
  const limit = req.query.limit ?? defaults.limit;
  const sort_type = req.query.sort_type ?? defaults.sort_type;
  const sort_by = req.query.sort_by ?? defaults.sort_by;
  const search = req.query.search ?? defaults.search;

  try {
    const coupons = await couponServices.findAllItems({
      limit,
      page,
      sort_by,
      sort_type,
      search,
    });

    const data = query.getTransformedItems({
      items: coupons,
      selection: [
        "_id",
        "discount_percentage",
        "coupon_code",
        "min_shopping_amount",
        "validity",
        "status",
        "createdAt",
        "updatedAt",
      ],
      links: [
        {
          path: "/api/v1/coupons",
          key: "self",
          property: "_id",
        },
      ],
    });

    const totalItems = await couponServices.count(search);
    const pagination = query.getPagination({ totalItems, limit, page });

    const links = query.getHATEOASForAllItems({
      url: req.url,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
      path: req.path,
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
