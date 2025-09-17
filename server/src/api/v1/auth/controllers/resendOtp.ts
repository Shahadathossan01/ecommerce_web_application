import authService from "@src/lib/auth";
import { ResendOtpInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import sendVerificationOtp from "@src/utils/sendVerificationOtp";
import { Request, Response, NextFunction } from "express";
const resendOtp = async (
  req: Request<{}, {}, ResendOtpInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  try {
    const { credential } = req.body;
    const plainOTP: string = await authService.resendOtp({ credential });

    const response = {
      code: 200,
      message: "New OTP send to your credential.",
      links: {
        self: "/api/v1/auth/resendOtp",
      },
    };

    res.status(200).json(response);

    setImmediate(async () => {
      await sendVerificationOtp({ otp: plainOTP, credential });
    });
  } catch (e: unknown) {
    next(e);
  }
};

export default resendOtp;
