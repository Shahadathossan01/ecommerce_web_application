import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { isZodError } from "@src/utils/commonTypeGuards";

const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({
          code: 400,
          error: "Bad Request",
          data: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        code: 500,
        error: "Internal Server Error",
        data: [],
      });
    }
  };

export default validate;
