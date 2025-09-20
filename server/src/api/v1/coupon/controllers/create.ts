import couponServices from "@src/lib/coupon";
import { MutateResponse } from "@src/types/common";
import { ICoupon, ICouponInput } from "@src/types/coupon";
import { Request, Response, NextFunction } from "express";

const create = async (
  req: Request<{}, {}, ICouponInput>,
  res: Response<MutateResponse<ICoupon>>,
  next: NextFunction
) => {
  const {
    coupon_code,
    discount_percentage,
    min_shopping_amount,
    status,
    validity,
  } = req.body;

  try {
    const coupon = await couponServices.create({
      coupon_code,
      discount_percentage,
      min_shopping_amount,
      status,
      validity,
    });

    const response = {
      code: 201,
      message: "Coupon created successfully",
      data: coupon,
      links: {
        self: `/api/v1/coupons/${coupon._id}`,
      },
    };

    res.status(201).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default create;
