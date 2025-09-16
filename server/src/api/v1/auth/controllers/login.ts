import authService from "@src/lib/auth";
import { loginInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { Request, Response, NextFunction } from "express";
const login = async (
  req: Request<{}, {}, loginInput>,
  res: Response<MutateResponse>,
  next: NextFunction
) => {
  try {
    const { credential, password } = req.body;

    const access_token = await authService.login({ credential, password });

    const response = {
      code: 200,
      message: "Login successfully",
      data: {
        access_token,
      },
      links: {
        self: "/api/v1/auth/login",
      },
    };

    res.status(200).json(response);
  } catch (e: unknown) {
    next(e);
  }
};

export default login;
