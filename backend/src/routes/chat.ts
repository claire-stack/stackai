import express from "express";
import { callOpenRouterStream } from "../services/openrouter";
import modelMap from "../config/modelMap";
import { handleChatStreamWithLogging } from "../services/chat"; // ✅ 新增這個 service
import { log } from "console";
import { authenticateJWT } from "../middleware/authenticateJWT"; // ✅ 你的 middleware 路徑
import { checkDailyLimit } from "../services/checkDailyLimit"; // ✅ 或是 checkDailyLimitFactory
import { Request, Response, Router } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const router = express.Router();

router.post("/:llm", async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: user not found" });
  }

  const userId = req.user.id;
  // 你的邏輯...
});

router.post(
  "/:llm",
  authenticateJWT, // ✅ 第一步：驗證 JWT，注入 req.user
  checkDailyLimit, // ✅ 第二步：檢查使用次數限制
  async (req, res, next) => {
    const { llm } = req.params;
    const { messages } = req.body;
    const model = modelMap[llm];
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const userId = req.user.id;

    console.log("[Chat Trigger]", llm, messages);

    if (!model || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid model or messages" });
    }

    try {
      await handleChatStreamWithLogging({ userId, model, messages, res });
    } catch (err: any) {
      console.error("[Route Error]", err);

      // If setup failed, set HTTP 500 and send SSE error event
      try {
        if (!res.headersSent)
          res
            .status(500)
            .json({ error: `OpenRouter stream failed: ${err.message}` });
        else {
          res.write(
            `data: ${JSON.stringify({
              error: `OpenRouter stream failed: ${err.message}`,
            })}\n\n`
          );
          res.end();
        }
      } catch (e) {
        // fallback
        if (!res.headersSent) res.status(500).end();
      }
    }
  }
);

export default router;
