import { Request, Response, NextFunction } from "express";
import authService from "../../../../lib/auth";
import { RegisterInput } from "../types";
import { isError } from "@src/utils/commonTypeGuards";
import sendVerificationOtp from "@src/utils/sendVerificationOtp";

const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  const { username, credential, password } = req.body;

  try {
    const { user, plainOtp } = await authService.register({
      username,
      credential,
      password,
    });

    const response = {
      code: 201,
      message:
        "Registration Received. Please check your email to verification OTP.",
      links: {
        self: `api/v1/auth/${req.url}`,
        login: "api/v1/auth/login",
      },
    };

    res.status(201).json(response);

    setImmediate(async () => {
      await sendVerificationOtp({ otp: plainOtp, credential });
    });
  } catch (err: unknown) {
    if (isError(err)) {
      next(err);
    } else {
      next(new Error("Unknown error"));
    }
  }
};

export default register;
