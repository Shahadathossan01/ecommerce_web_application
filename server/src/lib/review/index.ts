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
const countAll = async () => {
  return await Review.countDocuments();
};

const findAllReviewsByProductId = async ({
  id,
  limit,
  page,
  sort_by,
  sort_type,
}: IPath &
  Pick<IReviewQuery, "page" | "limit" | "sort_by" | "sort_type">): Promise<
  IReview[]
> => {
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
const findAllItems = async ({
  limit,
  page,
  sort_by,
  sort_type,
  search,
}: Pick<
  IReviewQuery,
  "page" | "limit" | "sort_by" | "sort_type" | "search"
>): Promise<IReview[]> => {
  const sortStr = `${sort_type === "desc" ? "-" : ""}${sort_by}`;

  const filter = {
    title: { $regex: search, $options: "i" },
  };

  const reviews = await Review.find(filter)
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

const updateItem = async ({
  id,
  ratting,
  review,
  title,
}: IReviewInput & IPath) => {
  const existingreview = await Review.findById({ _id: id });

  if (!existingreview) {
    throw error(404, "Not Found", "Review not found");
  }

  const payload = {
    ratting,
    title,
    review,
  };

  Object.assign(existingreview, payload);

  await existingreview.save();

  return existingreview.toObject();
};

const removeItem = async ({ id }: IPath) => {
  const review = await Review.findById({ _id: id });

  if (!review) {
    throw error(404, "Not Found", "Product variant not found");
  }

  return await Review.findOneAndDelete({ _id: id });
};

const reviewServices = {
  createReviewByProductId,
  findAllReviewsByProductId,
  count,
  findAllItems,
  countAll,
  updateItem,
  removeItem,
};

export default reviewServices;
