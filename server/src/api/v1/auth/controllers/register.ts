import { Request, Response, NextFunction } from "express";
import authService from "../../../../lib/auth";
import { RegisterInput } from "../types";
import { isError } from "@src/utils/commonTypeGuards";

const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  const { username, credential, password } = req.body;

  try {
    const user = await authService.register({ username, credential, password });
  } catch (err: unknown) {
    if (isError(err)) {
      next(err);
    } else {
      next(new Error("Unknown error"));
    }
  }
};

export default register;
