import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ✅ 若前端用 Vite，記得加 credentials 支援app.use(express.json());
app.use(cookieParser()); // ✅ 解析 cookie
app.use(express.json());

app.use("/api/chat", chatRouter);
app.use("/api/auth", authRouter);

// Global error handler to always return JSON
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("[Global Error Handler]", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
      details: err.stack || null,
    });
  }
);

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

export default app;
