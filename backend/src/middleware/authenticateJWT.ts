import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/auth";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "未登入，缺少 access_token" });
  }

  try {
    const payload = verifyAccessToken(token); // 解析 JWT
    req.user = { id: payload.userId }; // 注入 userId
    next();
  } catch (err) {
    return res.status(401).json({ error: "JWT 驗證失敗" });
  }
}
