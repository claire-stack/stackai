import { prisma } from "../prisma";
import { callOpenRouterStream } from "./openrouter";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const todayUtc = dayjs().utc().startOf("day").toDate();

export async function handleChatStreamWithLogging({
  userId,
  model,
  messages,
  res,
}: {
  userId: string;
  model: string;
  messages: { role: string; content: string }[];
  res: any;
}) {
  const userInput = messages.find((m) => m.role === "user")?.content || "";
  let aiReply = "";
  let tokenCount = 0;

  try {
    const stream = await callOpenRouterStream(model, messages);

    console.log(
      `[Chat] OpenRouter stream created for model=${model}. res.headersSent=${res.headersSent}`
    );

    // Only set SSE headers after the upstream stream is successfully created.
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    stream.on("data", async (chunk: Buffer) => {
      const lines = chunk.toString().split("\n");
      for (const line of lines) {
        if (line.startsWith("data:")) {
          const json = line.replace(/^data:\s*/, "");

          if (json === "[DONE]") {
            res.write(`event: done\ndata: [DONE]\n\n`);
            res.end();

            // ✅ 寫入訊息與使用次數
            console.log("[SSE] 收到 [DONE]，準備寫入 usage");

            await prisma.$transaction([
              prisma.message.create({
                data: {
                  userId,
                  role: "user",
                  content: userInput,
                  model,
                  tokens: 0,
                  status: "success",
                },
              }),
              prisma.message.create({
                data: {
                  userId,
                  role: "assistant",
                  content: aiReply,
                  model,
                  tokens: tokenCount,
                  status: "success",
                },
              }),
              prisma.usage.upsert({
                where: {
                  userId_model_date: {
                    userId,
                    model,
                    date: todayUtc,
                  },
                },
                update: { count: { increment: 1 } },
                create: {
                  userId,
                  model,
                  date: todayUtc,
                  count: 1,
                },
              }),
            ]);

            return;
          }

          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiReply += content;
              tokenCount += content.length; // 粗略估算 token 數
              res.write(`data: ${json}\n\n`);
            }
          } catch (err) {
            console.error("[Parse Error]", err);
            res.write(`data: ${JSON.stringify({ error: "回覆解析失敗" })}\n\n`);
            res.end();
            return; // ✅ 要加這行
          }
        }
      }
    });

    stream.on("end", () => {
      if (!res.writableEnded) res.end();
    });

    stream.on("error", async (err: any) => {
      console.error("[Stream Error]", {
        message: err?.message,
        status: err?.status || err?.response?.status,
        data: err?.data || err?.response?.data,
        headersSent: res.headersSent,
      });

      // If headers not yet sent, return a normal JSON error response so clients
      // that check res.ok see the failure. Otherwise fall back to SSE error.
      try {
        if (!res.headersSent) {
          console.error(
            "[Stream Error] sending HTTP 500 JSON (headers not sent)"
          );
          return res.status(500).json({ error: err.message });
        }
      } catch (e) {
        /* ignore */
      }

      console.error("[Stream Error] sending SSE error (headers already sent)");
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();

      await prisma.message.create({
        data: {
          userId,
          role: "assistant",
          content: "",
          model,
          tokens: 0,
          status: "error",
          errorMessage: err.message,
        },
      });
    });
  } catch (err: any) {
    console.error("[Chat Error]", {
      message: err?.message,
      status: err?.status || err?.response?.status,
      data: err?.data || err?.response?.data,
      headersSent: (err && (err as any).headersSent) || false,
    });
    // If headers not yet sent, respond with normal HTTP JSON so fetch.ok is false
    const errMsg = err?.message || "系統錯誤，請稍後再試";
    try {
      if (!res.headersSent) {
        console.error("[Chat Error] sending HTTP 500 JSON (headers not sent)");
        return res.status(500).json({ error: errMsg });
      }
    } catch (e) {
      /* ignore */
    }

    // Otherwise, send SSE-formatted JSON error
    res.write(`data: ${JSON.stringify({ error: errMsg })}\n\n`);
    res.end();

    await prisma.message.create({
      data: {
        userId,
        role: "assistant",
        content: "",
        model,
        tokens: 0,
        status: "error",
        errorMessage: err.message,
      },
    });

    return; // ✅ 加這行
  }
}
