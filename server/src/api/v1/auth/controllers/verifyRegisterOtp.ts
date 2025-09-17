import { VerifyRegisterOtpInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";
import authService from "../../../../lib/auth";
const verifyRegisterOtp = async (
  req: Request<{}, {}, VerifyRegisterOtpInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  const { credential, otp } = req.body;
  console.log(credential, otp);
  try {
    const result: MutateResponse = await authService.verifyRegisterOtp({
      credential,
      otp,
    });

    res.status(200).json(result);
  } catch (err: unknown) {
    next(err);
  }
};

export default verifyRegisterOtp;
