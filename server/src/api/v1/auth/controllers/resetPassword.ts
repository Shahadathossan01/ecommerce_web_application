import authService from "@src/lib/auth";
import { resetPasswordInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";

const resetPassword = async (
  req: Request<{}, {}, resetPasswordInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  try {
    const { credential, newPassword } = req.body;

    await authService.resetPassword({ credential, newPassword });

    const response = {
      code: 200,
      message: "Password reset successfully. Please log in!",
      links: {
        self: "/api/v1/auth/resetPassword",
        login: "/api/v1/auth/login",
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default resetPassword;
