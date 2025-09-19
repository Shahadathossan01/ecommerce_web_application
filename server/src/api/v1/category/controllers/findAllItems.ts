import { RequestHandler, Request, Response, NextFunction } from "express";
import { CategoryQuery, ICategory } from "@src/types/category";
import { GetResponse } from "@src/types/common";
import defaults from "../../../../config/defaults";
import categoryService from "@src/lib/category";
import query from "@src/utils/query";

const findAllItems = async (
  req: Request<{}, {}, {}, CategoryQuery>,
  res: Response<GetResponse>,
  next: NextFunction
) => {
  const page = req.query.page ?? defaults.page;
  const limit = req.query.limit ?? defaults.limit;
  const sort_type = req.query.sort_type ?? defaults.sort_type;
  const sort_by = req.query.sort_by ?? defaults.sort_by;
  const search = req.query.search ?? defaults.search;

  try {
    const categories = await categoryService.findAllItems({
      page,
      limit,
      sort_type,
      sort_by,
      search,
    });

    const data = query.getTransformedItems({
      items: categories,
      selection: ["_id", "name", "createdAt", "updatedAt"],
      links: [
        {
          path: "/api/v1/categories",
          key: "self",
          property: "_id",
        },
      ],
    });

    const totalItems = await categoryService.count({ search });

    const pagination = query.getPagination({ totalItems, limit, page });

    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
    });

    res.status(200).json({ data, pagination, links });
  } catch (e) {
    next(e);
  }
};

export default findAllItems;
