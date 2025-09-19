import { Request, Response, NextFunction } from "express";
import defaults from "../../../../config/defaults";

const findAllReviewsByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const page = req.query.page ?? defaults.page;
  const limit = req.query.limit ?? defaults.limit;
  const sort_type = req.query.sort_type ?? defaults.sort_type;
  const sort_by = req.query.sort_by ?? defaults.sort_by;

  try {
  } catch (e: unknown) {
    next(e);
  }
};

export default findAllReviewsByProductId;
