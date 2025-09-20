import { GetResponse, IQuery } from "@src/types/common";
import defaults from "@src/config/defaults";
import { IReview } from "@src/types/review";
import { Request, Response, NextFunction, response } from "express";
import query from "@src/utils/query";
import reviewServices from "@src/lib/review";
const findAllItems = async (
  req: Request<
    {},
    {},
    {},
    Pick<IQuery, "page" | "limit" | "sort_type" | "sort_by" | "search">
  >,
  res: Response<GetResponse<IReview[]>>,
  next: NextFunction
) => {
  const page = req.query.page ?? defaults.page;
  const limit = req.query.limit ?? defaults.limit;
  const sort_type = req.query.sort_type ?? defaults.sort_type;
  const sort_by = req.query.sort_by ?? defaults.sort_by;
  const search = req.query.search ?? defaults.search;

  try {
    const reviews = await reviewServices.findAllItems({
      page,
      limit,
      sort_type,
      sort_by,
      search,
    });

    const data = query.getTransformedItems({
      items: reviews,
      selection: ["_id", "title", "product_id", "ratting", "review", "user_id"],
      links: [
        {
          path: "/api/v1/reviews",
          key: "self",
          property: "_id",
        },
        {
          path: "/api/v1/products",
          key: "product",
          property: "product_id",
        },
      ],
    });

    const totalItems = await reviewServices.countAll();

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
