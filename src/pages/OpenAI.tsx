import React from "react";

const featuredPost = {
	title: "The n8n Scalability Benchmark",
	link: "https://blog.n8n.io/the-n8n-scalability-benchmark/",
	author: "Charley Mann, Angel Menendez",
	date: "September 24, 2025",
	image:
		"https://blog.n8n.io/content/images/size/w300/2025/02/9F4DBDDB-5CD7-4F43-87A1-51F2C9404BC9_1_201_a.jpeg",
};

const recentPosts = [
	{
		title: "Practical Evaluation Methods for Enterprise-Ready LLMs",
		link: "https://blog.n8n.io/practical-evaluation-methods-for-enterprise-ready-llms/",
	},
	{
		title: "Agentic RAG: A Guide to Building Autonomous AI Systems",
		link: "https://blog.n8n.io/agentic-rag/",
	},
	{
		title: "Evaluating RAG, aka Optimizing the Optimization",
		link: "https://blog.n8n.io/evaluating-rag-aka-optimizing-the-optimization/",
	},
	{
		title: "12 Best Autonomous AI Agents – 2025’s Top Picks",
		link: "https://blog.n8n.io/best-autonomous-ai-agents/",
	},
	{
		title: "New plan, no active workflow limits — n8n's new pricing explained.",
		link: "https://blog.n8n.io/build-without-limits-everything-you-need-to-know-about-n8ns-new-pricing/",
	},
	{
		title: "Beyond the Hype: 10 Best AI Agents That Truly Work",
		link: "https://blog.n8n.io/best-ai-agents/",
	},
	{
		title: "What Is AI Sentiment Analysis and How to Build It with n8n?",
		link: "https://blog.n8n.io/ai-sentiment-analysis/",
	},
	{
		title: "7 Best AI Agent Builders: An Expert Market Breakdown",
		link: "https://blog.n8n.io/best-ai-agent-builders/",
	},
];

const tags = [
	"AI",
	"Database",
	"Marketing automation",
	"Sales",
	"SecOps",
	"ITOps",
	"Tools Alternatives",
	"Bot",
];

const integrations = [
	"Google Sheets",
	"Telegram",
	"MySQL",
	"Slack",
	"Discord",
	"Postgres",
];

const guides = [
	"Telegram bots",
	"Open-source chatbot",
	"Open-source LLM",
	"Open-source low-code platforms",
	"Zapier alternatives",
	"Make vs Zapier",
];

const OpenAIPage = () => (
	<div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
		<h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 16 }}>
			n8n Blog
		</h1>
		<div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
			<img
				src={featuredPost.image}
				alt={featuredPost.title}
				style={{ width: 180, borderRadius: 8 }}
			/>
			<div>
				<h2 style={{ fontSize: 24, marginBottom: 8 }}>
					<a href={featuredPost.link} target="_blank" rel="noopener noreferrer">
						{featuredPost.title}
					</a>
				</h2>
				<div style={{ color: "#888", marginBottom: 8 }}>
					{featuredPost.author} · {featuredPost.date}
				</div>
				<div style={{ fontSize: 16, color: "#555" }}>
					Ever wondered just how hard you can push n8n before it starts waving
					the white flag? We pushed n8n to the limits, with impressive results.
					When you’re running mission-critical workflows, you...
				</div>
			</div>
		</div>
		<h3 style={{ fontSize: 20, marginBottom: 12 }}>Recent Posts</h3>
		<ul style={{ marginBottom: 32 }}>
			{recentPosts.map((post) => (
				<li key={post.title} style={{ marginBottom: 8 }}>
					<a
						href={post.link}
						target="_blank"
						rel="noopener noreferrer"
						style={{ fontSize: 16 }}
					>
						{post.title}
					</a>
				</li>
			))}
		</ul>
		<h3 style={{ fontSize: 20, marginBottom: 12 }}>Explore by use case</h3>
		<div
			style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}
		>
			{tags.map((tag) => (
				<span
					key={tag}
					style={{
						background: "#eee",
						borderRadius: 12,
						padding: "4px 12px",
						fontSize: 14,
					}}
				>
					{tag}
				</span>
			))}
		</div>
		<h3 style={{ fontSize: 20, marginBottom: 12 }}>Popular Integrations</h3>
		<div
			style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}
		>
			{integrations.map((integration) => (
				<span
					key={integration}
					style={{
						background: "#e0f7fa",
						borderRadius: 12,
						padding: "4px 12px",
						fontSize: 14,
					}}
				>
					{integration}
				</span>
			))}
		</div>
		<h3 style={{ fontSize: 20, marginBottom: 12 }}>Top Guides</h3>
		<ul>
			{guides.map((guide) => (
				<li key={guide} style={{ marginBottom: 8 }}>
					{guide}
				</li>
			))}
		</ul>
	</div>
);

export default OpenAIPage;
