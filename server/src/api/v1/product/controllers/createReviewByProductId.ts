import reviewServices from "@src/lib/review";
import { IUser } from "@src/types/auth";
import { AuthenticatedRequest, IPath, MutateResponse } from "@src/types/common";
import { IReview, IReviewInput } from "@src/types/review";
import { Request, Response, NextFunction } from "express";

const createReviewByProductId = async (
  req: Request<IPath, {}, IReviewInput> & { user: IUser },
  res: Response<MutateResponse<IReview>>,
  next: NextFunction
) => {
  const { id } = req.params;
  const { ratting, review, title } = req.body;
  const user_id = req.user._id;

  try {
    const createReview = await reviewServices.createReviewByProductId({
      id,
      user_id,
      ratting,
      review,
      title,
    });

    const response = {
      code: 201,
      message: "Review created successfully",
      data: createReview,
      links: {
        self: `/api/v1/products/${id}/reviews/${createReview._id}`,
        product: `/api/v1/products/${id}`,
        user: `/api/v1/users/${user_id}`,
      },
    };

    res.status(201).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default createReviewByProductId;
