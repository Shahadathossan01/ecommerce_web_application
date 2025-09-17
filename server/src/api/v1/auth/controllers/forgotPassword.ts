import authService from "@src/lib/auth";
import { ForgotPasswordInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";
import resendOtp from "./resendOtp";
import sendVerificationOtp from "@src/utils/sendVerificationOtp";

const forgotPassword = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  try {
    const { credential } = req.body;
    const plainOTP = await authService.forgotPassword({ credential });

    const response = {
      code: 200,
      message: "OTP sent to your credential",
      links: {
        self: "/api/v1/auth/forgotPassword",
        resendOtp: "/api/v1/auth/resendOtp",
        verifyResetOtp: "/api/v1/auth/verifyResetOtp",
      },
    };

    res.status(200).json(response);

    setImmediate(async () => {
      try {
        await sendVerificationOtp({ otp: plainOTP, credential });
      } catch (err) {
        console.error("Failed to send OTP:", err);
      }
    });
  } catch (e: unknown) {
    next(e);
  }
};

export default forgotPassword;
