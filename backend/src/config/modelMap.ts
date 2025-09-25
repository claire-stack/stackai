// Map LLM name to OpenRouter model string
const modelMap: Record<string, string> = {
  OpenAI: 'openai/gpt-5-nano',
  Claude: 'anthropic/claude-3-haiku',
  Gemini: 'google/gemini-flash-1.5-8b',
  xAI: 'x-ai/grok-4-fast:free',
  Meta: 'meta-llama/llama-4-scout:free',
  deepseek: 'deepseek/deepseek-chat-v3.1:free',
};

export default modelMap;
