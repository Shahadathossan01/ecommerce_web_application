import express, { Application, Request, Response, NextFunction } from "express";
import applyMiddleware from "./middleware";
import routes from "./routes";
import { isCustomError, isError } from "./utils/commonTypeGuards";

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
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // Check: throw error("Not Found", 404)
  if (isCustomError(err)) {
    return res
      .status(err.status)
      .json({ code: err.status, message: err.message });
  }
  // Check: throw new Error("Something broke")
  if (isError(err)) {
    return res.status(500).json({ code: 500, message: err.message });
  }
  // Check: throw "oops" or throw 123
  return res.status(500).json({ code: 500, message: "Server error occurred" });
});
export default app;
