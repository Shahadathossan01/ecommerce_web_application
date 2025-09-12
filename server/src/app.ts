import express from "express";
import applyMiddleware from "./middleware";
import routes from "./routes";

const app = express();
applyMiddleware(app);
app.use(routes);

app.get("/api/v1/health", (_req, res, next) => {
  try {
    res.status(200).json({
      code: 200,
      message: "OK",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "Server error occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
  });
});

export default app;
