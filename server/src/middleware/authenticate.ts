import tokenService from "@src/lib/token";
import userService from "@src/lib/user";
import { AuthenticatedRequest } from "@src/types/auth";
import { AuthPayload } from "@src/types/token";
import error from "@src/utils/error";
import { Request, Response, NextFunction } from "express";
const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw error(
      401,
      "Unauthorized",
      "Your session has expired. Please log in again"
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw error(
      401,
      "Unauthorized",
      "Your session has expired. Please log in again"
    );
  }

  try {
    const decodedUser = tokenService.verifyToken<AuthPayload>({ token });
    const user = await userService.findUserByEmail(decodedUser.credential);

    if (!user) {
      throw error(
        401,
        "Unauthorized",
        "Your session has expired. Please log in again"
      );
    }
    req.user = user.toObject();
    next();
  } catch (e: unknown) {
    next(e);
  }
};

export default authenticate;
