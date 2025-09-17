import authService from "@src/lib/auth";
import { VerifyResetOtpInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";

const verifyResetOtp = async (
  req: Request<{}, {}, VerifyResetOtpInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  try {
    const { credential, otp } = req.body;
    await authService.verifyResetOtp({ credential, otp });

    const response = {
      code: 200,
      message: "OTP verified. Now rest your password.",
      links: {
        self: "/api/v1/auth/verifyResetOtp",
        resetPassword: "/api/v1/auth/resetPassword",
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default verifyResetOtp;
