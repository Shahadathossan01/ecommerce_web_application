import { Request, Response, NextFunction } from "express";
import defaults from "../../../../config/defaults";
import { GetResponse, IPath } from "@src/types/common";
import { IReviewQuery } from "@src/types/review";
import reviewServices from "@src/lib/review";
import query from "@src/utils/query";
import productServices from "@src/lib/product";
import { calculateAverageRating, calculateRatingBreakdown } from "../utils";

const findAllReviewsByProductId = async (
  req: Request<IPath, {}, {}, IReviewQuery>,
  res: Response<GetResponse>,
  next: NextFunction
) => {
  const { id } = req.params;
  const page = req.query.page ?? defaults.page;
  const limit = req.query.limit ?? defaults.limit;
  const sort_type = req.query.sort_type ?? defaults.sort_type;
  const sort_by = req.query.sort_by ?? defaults.sort_by;

  try {
    const reviews = await reviewServices.findAllReviewsByProductId({
      id,
      page,
      limit,
      sort_type,
      sort_by,
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

    const totalItems = await reviewServices.count({ id });

    const pagination = query.getPagination({ totalItems, limit, page });

    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    const ratting_breakdown = calculateRatingBreakdown(reviews);

    const ratting_average = calculateAverageRating(reviews);

    const response = {
      data,
      meta: {
        reviews_count: totalItems,
        ratting_average: ratting_average,
        ratting_breakdown: ratting_breakdown,
      },
      pagination,
      links,
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default findAllReviewsByProductId;
