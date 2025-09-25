export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  timestamp: number;
};
