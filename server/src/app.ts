import express, { Application, Request, Response, NextFunction } from "express";
import applyMiddleware from "./middleware";
import routes from "./routes";
import { isCustomError } from "./utils/typeGuards/customError";

const app: Application = express();
applyMiddleware(app);
app.use(routes);

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    code: 200,
    message: "OK",
  });
});

app.use((err: unknown, _req: Request, res: Response) => {
  // Check: throw error("Not Found", 404)
  if (isCustomError(err)) {
    return res.status(err.status).json({ message: err.message });
  }

  // Check: throw new Error("Something broke")
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  // Check: throw "oops" or throw 123
  return res.status(500).json({ message: "Server error occurred" });
});

export default app;
