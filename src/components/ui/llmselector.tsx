const availableLLMs = ["OpenAI", "Claude", "Gemini", "xAI", "Meta", "deepseek"];

export function LLMSelector({ selected, onSelect }) {
	return (
		<div className="flex flex-col sm:flex-row gap-2 justify-center mb-6 sm:mb-8">
			{availableLLMs.map((llm) => (
				<button
					key={llm}
					onClick={() => onSelect(llm)}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${
							selected === llm
								? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
								: "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
						}`}
				>
					{llm}
				</button>
			))}
		</div>
	);
}
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 "></div>;
