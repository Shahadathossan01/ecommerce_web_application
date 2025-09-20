import Coupon from "@src/model/Coupon";
import { ICoupon, ICouponInput } from "@src/types/coupon";
import { hashMatched, generateHash } from "@src/utils/hashing";

const create = async ({
  coupon_code,
  discount_percentage,
  min_shopping_amount,
  status,
  validity,
}: ICouponInput): Promise<ICoupon> => {
  const hashed_couponCode = await generateHash(coupon_code);

  const coupon = new Coupon({
    discount_percentage,
    min_shopping_amount,
    status,
    validity,
    coupon_code: hashed_couponCode,
  });

  await coupon.save();

  return coupon.toObject();
};

const couponServices = {
  create,
};

export default couponServices;
