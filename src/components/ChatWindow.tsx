import {LLMSelector} from "@/components/ui/llmselector"
import {useState, useEffect, useRef} from "react"
import { ChatMessage } from "@/data/chatmessage";
 import { v4 as uuidv4 } from 'uuid'; 
import { log } from "console";
import TypingDotsLottie  from '@/lib/typing';



export default function ChatWindow() {
  const [selectedLLM, setSelectedLLM] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);


useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }
}, [messages]);


const sendMessage = async () => {
  const userMsg: ChatMessage = {
    id: uuidv4(),
    role: 'user',
    content: input,
    timestamp: Date.now(),
  };

  const botMsgId = uuidv4();
  const botMsg: ChatMessage = {
    id: botMsgId,
    role: 'assistant',
    content: '',   
    source: selectedLLM,
    timestamp: Date.now(),
  };

  setMessages((prev) => [...prev, userMsg, botMsg]);
  setInput('');

  const res = await fetch(`http://localhost:8080/chat/${selectedLLM}`, {
    method: 'POST',
    body: JSON.stringify({ messages: [{ role: 'user', content: input }] }),
    headers: { 'Content-Type': 'application/json' },
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let botContent = '';

  if (reader) {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split('\n\n');
      buffer = chunks.pop() || '';

      for (const chunk of chunks) {
        if (chunk.startsWith('data:')) {
          const json = chunk.replace(/^data:\s*/, '');
          if (json === '[DONE]') break;

          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              botContent += content;

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMsgId
                    ? { ...msg, content: botContent }
                    : msg
                )
              );
            }
          } catch (err) {
            console.error('Chunk parse error:', err);
          }
        }
      }
    }
  }
};


  return (
 <div className="mt-24 max-w-2xl mx-auto px-6 py-6 bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg text-white space-y-6">
    
    {/* 模型選擇器 */}
    <LLMSelector selected={selectedLLM} onSelect={setSelectedLLM} />

    {/* 訊息區塊 */}
    <div
  ref={chatRef}
  className="chat-history max-h-[300px] min-h-[300px] overflow-y-auto border-y border-white/10 py-4 space-y-4 flex flex-col"
>
  {messages.length === 0 ? (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-sm text-gray-500 italic">尚未開始對話</p>
    </div>
  ) : (
    messages.map((msg, i) => (
      <div key={i} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
        <div className="inline-block bg-[#2a2a2a] px-4 py-2 rounded-lg">
          <span className="block text-xs text-gray-400 mb-1">{msg.source || '使用者'}</span>
          {msg.content === '' ? (
            <TypingDotsLottie
              src="https://lottie.host/2a280951-ae2b-4155-985b-fdce8ae1b2bb/7nWytwMwyi.json"
              size={32}
            />
          ) : (
            <p className="text-white">{msg.content}</p>
          )}
        </div>
      </div>
    ))
  )}
</div>


    {/* 輸入與送出 */}
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="打字啊..."
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition"
      >
        送出
      </button>
    </div>
  </div>
  );
}
