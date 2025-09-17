import { AuthenticatedRequest } from "@src/types/auth";
import error from "@src/utils/error";
import { Response, NextFunction } from "express";

const authorize =
  (roles = ["admin"]) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw error(
        401,
        "Unauthorized",
        "Your session has expired. Please log in again"
      );
    }
    if (roles.includes(req.user.role)) {
      return next();
    }

    throw error(401, "Permission Deny!", "Not permitted this route");
  };

export default authorize;
