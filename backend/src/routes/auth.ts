import { Router } from "express";
import {
  verifyGoogleJwt,
  generateAccessToken,
  verifyAccessToken,
} from "../services/auth";
import { prisma } from "../prisma";

const router = Router();
const isProduction = process.env.NODE_ENV === "production";

router.post("/google", async (req, res) => {
  try {
    const { jwt: googleJwt } = req.body;
    console.log("收到 Google JWT:", googleJwt);

    const user = await verifyGoogleJwt(googleJwt);
    console.log("驗證成功，使用者：", user);

    const token = generateAccessToken(user.id);
    console.log("產生 JWT:", token);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction, // ✅ 本地 false，正式 true
      sameSite: "lax", // ✅ 本地建議用 lax，避免瀏覽器拒絕      path: "/",
      maxAge: 1000 * 60 * 60,
    });

    console.log("已設定 cookie，準備回傳使用者");
    res.status(200).json({ user });
  } catch (err) {
    console.error("XXGoogle login error:", err);
    res.status(401).json({ error: "登入失敗" });
  }
});

router.get("/me", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "未登入" });

  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) return res.status(404).json({ error: "使用者不存在" });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "JWT 驗證失敗" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({ message: "已登出" });
});

export default router;
