import reviewServices from "@src/lib/review";
import { IPath, MutateResponse } from "@src/types/common";
import { IReview, IReviewInput } from "@src/types/review";
import { Request, Response, NextFunction } from "express";

const updateItem = async (
  req: Request<IPath, {}, IReviewInput>,
  res: Response<MutateResponse<IReview>>,
  next: NextFunction
) => {
  const { id } = req.params;
  const { ratting, review, title } = req.body;

  try {
    const updatedReview = await reviewServices.updateItem({
      id,
      ratting,
      review,
      title,
    });

    const response = {
      code: 200,
      message: "Review updated successfully",
      data: updatedReview,
      links: {
        self: `/api/v1/reviews/${updatedReview._id}`,
        product: `/api/v1/products/${updatedReview.product_id}`,
        author: `/api/v1/users/${updatedReview.user_id}`,
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default updateItem;
