import { ZodObject } from "zod";
import { Request, Response, NextFunction, response } from "express";
import { isZodError } from "@src/utils/commonTypeGuards";
import { ErrorResponse } from "@src/types/common";

const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (isZodError(error)) {
        const response = {
          code: 400,
          error: "Bad Request",
          data: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        };
        return res.status(400).json(response);
      }

      const response = {
        code: 500,
        error: "Internal Server Error",
        data: [],
      };
      return res.status(500).json(response);
    }
  };

export default validate;
