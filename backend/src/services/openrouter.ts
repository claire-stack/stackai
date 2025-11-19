import axios from "axios";
import { OPENROUTER_API_KEY } from "../config/env";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callOpenRouterStream(model: string, messages: any[]) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("Missing OpenRouter API key");
  }

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model,
        messages,
        stream: true,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "stream",
      }
    );

    return response.data; // ReadableStream
  } catch (error: any) {
    console.error(
      "[OpenRouter Stream Error]",
      error?.response?.data || error.message
    );
    const err = new Error(`OpenRouter stream failed: ${error.message}`) as any;
    if (error.response?.status) err.status = error.response.status;
    if (error.response?.data) err.data = error.response.data;
    throw err;
  }
}
