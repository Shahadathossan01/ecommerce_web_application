import Review from "@src/model/Review";
import { IPath } from "@src/types/common";
import { IReview, IReviewInput, IReviewQuery } from "@src/types/review";
import error from "@src/utils/error";
import { Types } from "mongoose";
import { skip } from "node:test";

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

const count = async ({ id }: IPath) => {
  return await Review.countDocuments({ product_id: id });
};

const findAllReviewsByProductId = async ({
  id,
  limit,
  page,
  sort_by,
  sort_type,
}: IPath & IReviewQuery): Promise<IReview[]> => {
  const sortStr = `${sort_type === "desc" ? "-" : ""}${sort_by}`;

  const reviews = await Review.find({ product_id: id })
    .populate({
      path: "user_id",
      select: "_id username",
      populate: {
        path: "profile",
        select: "avator",
      },
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit)
    .lean();

  if (reviews.length === 0) {
    throw error(404, "Not Found", "Reviews not found");
  }

  return reviews;
};
const reviewServices = {
  createReviewByProductId,
  findAllReviewsByProductId,
  count,
};

export default reviewServices;
