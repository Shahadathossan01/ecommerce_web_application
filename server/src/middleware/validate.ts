/**
 * Only body
 */

// import { ZodObject } from "zod";
// import { Request, Response, NextFunction, response } from "express";
// import { isZodError } from "@src/utils/commonTypeGuards";
// import { ErrorResponse } from "@src/types/common";

// const validate =
//   (schema: ZodObject) =>
//   (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
//     try {
//       req.body = schema.parse(req.body);
//       next();
//     } catch (error: unknown) {
//       if (isZodError(error)) {
//         const response = {
//           code: 400,
//           error: "Bad Request",
//           data: error.issues.map((issue) => ({
//             field: issue.path.join("."),
//             message: issue.message,
//           })),
//         };
//         return res.status(400).json(response);
//       }

//       const response = {
//         code: 500,
//         error: "Internal Server Error",
//         data: [],
//       };
//       return res.status(500).json(response);
//     }
//   };

// export default validate;

/**
 * For all Body,Query,Params
 */
import { ZodObject, ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { isZodError } from "@src/utils/commonTypeGuards";
import { ErrorResponse } from "@src/types/common";

type RequestPart = "body" | "query" | "params";

const validate =
  (schema: ZodObject<any>, part: RequestPart = "body") =>
  (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    console.log(part);
    try {
      // Validate the specified part (body, query, or params)
      const parsed = schema.parse((req as any)[part]);

      if (part === "query" || part === "params") {
        // merge parsed values into existing object
        Object.assign((req as any)[part], parsed);
      } else {
        // body can be replaced safely
        (req as any).body = parsed;
      }
      next();
    } catch (error: unknown) {
      console.log("error", error);
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
