import Review from "@src/model/Review";
import { IPath } from "@src/types/common";
import { IReview, IReviewInput } from "@src/types/review";
import { Types } from "mongoose";

const createReviewByProductId = async ({
  id,
  user_id,
  ratting,
  review,
  title,
}: IReviewInput & IPath & { user_id: Types.ObjectId }): Promise<IReview> => {
  const createReiew = new Review({
    title,
    ratting,
    review,
    product_id: id,
    user_id,
  });

  await createReiew.save();

  return createReiew.toObject();
};

const reviewServices = {
  createReviewByProductId,
};

export default reviewServices;
