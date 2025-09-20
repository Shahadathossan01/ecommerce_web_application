import Coupon from "@src/model/Coupon";
import { IQuery } from "@src/types/common";
import { ICoupon, ICouponInput } from "@src/types/coupon";
import error from "@src/utils/error";

const create = async ({
  coupon_code,
  discount_percentage,
  min_shopping_amount,
  status,
  validity,
}: ICouponInput): Promise<ICoupon> => {
  const existingCouponCode = await Coupon.findOne({ coupon_code });

  if (existingCouponCode) {
    throw error(400, "Bad Request", "Coupon code already created");
  }
  const coupon = new Coupon({
    discount_percentage,
    min_shopping_amount,
    status,
    validity,
    coupon_code,
  });

  await coupon.save();

  return coupon.toObject();
};

const findAllItems = async ({
  limit,
  page,
  sort_by,
  sort_type,
  search,
}: Pick<
  IQuery,
  "page" | "limit" | "sort_by" | "sort_type" | "search"
>): Promise<ICoupon[]> => {
  const sortStr = `${sort_type === "desc" ? "-" : ""}${sort_by}`;

  const filter: Record<string, unknown> = {
    coupon_code: { $regex: search, $options: "i" },
  };

  const coupons = await Coupon.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit)
    .lean();

  return coupons;
};

const count = async (search: string): Promise<number> => {
  const filter: Record<string, unknown> = {
    coupon_code: { $regex: search, $options: "i" },
  };

  return await Coupon.countDocuments(filter);
};

const couponServices = {
  create,
  findAllItems,
  count,
};

export default couponServices;
