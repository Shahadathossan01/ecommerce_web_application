import couponServices from "@src/lib/coupon";
import { IPath } from "@src/types/common";
import { ICouponInput } from "@src/types/coupon";
import { Request, Response, NextFunction } from "express";

const updateItem = async (
  req: Request<IPath, {}, ICouponInput>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const {
    coupon_code,
    discount_percentage,
    min_shopping_amount,
    status,
    validity,
  } = req.body;

  try {
    const coupon = await couponServices.updateItem({
      coupon_code,
      discount_percentage,
      id,
      min_shopping_amount,
      status,
      validity,
    });

    const response = {
      code: 200,
      message: "Coupon created successfully",
      data: coupon,
      links: {
        self: `/api/v1/coupons/${coupon._id}`,
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default updateItem;
