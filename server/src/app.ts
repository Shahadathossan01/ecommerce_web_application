import express, {
  Application,
  Request,
  Response,
  NextFunction,
  response,
} from "express";
import applyMiddleware from "./middleware";
import routes from "./routes";
import { isCustomError, isError } from "./utils/commonTypeGuards";
import { ErrorResponse } from "./types/common";

const app: Application = express();
applyMiddleware(app);
app.get("/favicon.ico", (_req, res) => res.status(204).end());
app.use(routes);

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    code: 200,
    message: "OK",
  });
});
app.use(
  (
    err: unknown,
    _req: Request,
    res: Response<ErrorResponse>,
    _next: NextFunction
  ) => {
    // Check: throw error("Not Found", 404)
    if (isCustomError(err)) {
      const response: ErrorResponse = {
        code: err.code,
        error: err.error,
        message: err.message,
      };

      return res.status(err.code).json(response);
    }

    // Check: throw new Error("Something broke")
    if (isError(err)) {
      const response: ErrorResponse = {
        code: 500,
        error: "Internal Server Error",
        message: err.message,
      };
      return res.status(500).json(response);
    }

    // Check: throw "oops" or throw 123
    const response: ErrorResponse = {
      code: 500,
      error: "Internal Server Error",
      message: "Server error occurred",
    };
    return res.status(500).json(response);
  }
);
export default app;
