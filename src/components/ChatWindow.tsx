import { LLMSelector } from "@/components/ui/llmselector";
import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/data/chatmessage";
import { v4 as uuidv4 } from "uuid";
import TypingDotsLottie from "@/lib/typing";
import { useCurrentUser } from "@/hooks/use-currentUser";

export default function ChatWindow() {
	const [selectedLLM, setSelectedLLM] = useState("deepseek");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const chatRef = useRef<HTMLDivElement>(null);

	const currentUser = useCurrentUser();
	const userId = currentUser?.id;

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	const sendMessage = async () => {
		if (!userId) {
			console.error("未登入，無法送出訊息");

			alert("請先登入才能發送訊息");
			return;
		}

		const userMsg: ChatMessage = {
			id: uuidv4(),
			role: "user",
			content: input,
			timestamp: Date.now(),
			status: "success",
		};

		const botMsgId = uuidv4();
		const botMsg: ChatMessage = {
			id: botMsgId,
			role: "assistant",
			content: "",
			source: selectedLLM,
			timestamp: Date.now(),
			status: "streaming",
		};

		setMessages((prev) => [...prev, userMsg, botMsg]);
		setInput("");

		try {
			const res = await fetch(`http://localhost:8080/api/chat/${selectedLLM}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					messages: [{ role: "user", content: input }],
				}),
			});

			if (!res.ok) {
				// Backend failed to start stream — try to parse JSON error body
				let errText = `HTTP ${res.status}`;
				try {
					const errJson = await res.json();
					if (errJson?.error) errText = errJson.error;
				} catch (e) {
					// ignore JSON parse errors
				}
				console.error("HTTP error:", res.status, errText);
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === botMsgId
							? {
									...msg,
									status: "error",
									content: `⚠️ ${errText}`,
							  }
							: msg
					)
				);
				return;
			}

			const reader = res.body?.getReader();
			if (!reader) {
				console.error("SSE reader 無法建立，後端可能未啟動串流");
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === botMsgId
							? {
									...msg,
									status: "error",
									content: "⚠️ 回覆失敗，後端未啟動串流",
							  }
							: msg
					)
				);
				return;
			}
			const decoder = new TextDecoder("utf-8");
			let buffer = "";
			let botContent = "";
			if (reader) {
				while (true) {
					const { value, done } = await reader.read();
					if (done) break;

					buffer += decoder.decode(value, { stream: true });
					const chunks = buffer.split("\n\n");
					buffer = chunks.pop() || "";

					for (const chunk of chunks) {
						if (chunk.startsWith("data:")) {
							const json = chunk.replace(/^data:\s*/, "");
							if (json === "[DONE]") {
								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === botMsgId ? { ...msg, status: "success" } : msg
									)
								);
								break;
							}

							// Try to parse as JSON; if it contains an error field show it
							try {
								const parsed = JSON.parse(json);
								if (parsed?.error) {
									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === botMsgId
												? {
														...msg,
														status: "error",
														content: `⚠️ ${parsed.error}`,
												  }
												: msg
										)
									);
									return; // stop reading stream
								}

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
								console.error("Chunk parse error:", err);
								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === botMsgId
											? {
													...msg,
													status: "error",
													content: "⚠️ 回覆失敗，chunk有點問題",
											  }
											: msg
									)
								);
								return; // stop on parse error
							}
						}
					}
				}
			}
		} catch (err) {
			console.error("Fetch error:", err);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === botMsgId
						? {
								...msg,
								status: "error",
								content: "⚠️ 回覆失敗，伺服器問題",
						  }
						: msg
				)
			);
			return;
		}
	};

	return (
		<div className="mt-20 sm:mt-24 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg text-white space-y-6">
			<LLMSelector selected={selectedLLM} onSelect={setSelectedLLM} />
			<div
				ref={chatRef}
				className="chat-history max-h-[700px] min-h-[500px] overflow-y-auto border-y border-white/10 py-4 space-y-4 flex flex-col space-y-4"
			>
				{messages.length === 0 ? (
					<div className="flex-1 flex items-center justify-center">
						<p className="text-sm text-gray-500 italic">尚未開始對話</p>
					</div>
				) : (
					messages.map((msg, i) => (
						<div
							key={i}
							className={`text-sm ${
								msg.role === "user" ? "text-right" : "text-left"
							}`}
						>
							<div className="inline-block max-w-[80%] sm:max-w-[60%] bg-[#2a2a2a] px-4 py-2 rounded-lg">
								<span className="block text-xs text-gray-400 mb-1">
									{msg.source || "使用者"}
								</span>
								{msg.content === "" ? (
									<TypingDotsLottie
										src="https://lottie.host/2a280951-ae2b-4155-985b-fdce8ae1b2bb/7nWytwMwyi.json"
										size={48}
									/>
								) : (
									<p className="text-white text-sm sm:text-base">
										{msg.content}
									</p>
								)}
							</div>
						</div>
					))
				)}
			</div>

			<div className="flex flex-col sm:flex-row gap-2 max-w-[600px] mx-auto">
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
