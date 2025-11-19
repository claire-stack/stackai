import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import dayjs from "dayjs";

export const checkDailyLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "未登入或身份無效" });

  const model = req.body.model || "default";
  const today = dayjs().startOf("day").toDate();

  try {
    const usage = await prisma.usage.findUnique({
      where: {
        userId_model_date: { userId, model, date: today },
      },
    });

    console.log("目前使用次數：", usage?.count ?? 0);

    if ((usage?.count ?? 0) >= 3) {
      return res.status(429).json({ error: "今日使用次數已達上限（3 次）" });
    }

    if (!usage) {
      await prisma.usage.create({
        data: { userId, model, date: today, count: 1 },
      });
    } else {
      await prisma.usage.update({
        where: { userId_model_date: { userId, model, date: today } },
        data: { count: { increment: 1 } },
      });
    }

    next();
  } catch (err) {
    console.error("使用次數檢查失敗:", err);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
};
