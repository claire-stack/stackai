import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { log } from "console";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext"; // 路徑依你的專案結構調整

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
	// const [isLogging, setIsLogging] = useState(false);
	// const [username, setUsername] = useState("");

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const clickedInsideAnyDropdown = dropdownRefs.current.some((ref) =>
				ref?.contains(event.target as Node)
			);
			if (!clickedInsideAnyDropdown) {
				setActiveDropdown(null);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	useEffect(() => {
		fetchUserInfo();
	}, []);

	const navItems = [
		{
			name: "首頁",
			to: "/",
		},
		{
			name: "服務方案",
			to: "/nav_pricing",
		},
		{
			name: "AI模型",
			hasDropdown: true,
			dropdownItems: [
				{ name: "OpenAI", to: "/model_OpenAI" },
				{ name: "Claude", to: "/model_Claude" },
				{ name: "Gemini", to: "/model_Gemini" },
				{ name: "xAI", to: "/model_xAI" },
				{ name: "Meta", to: "/model_Meta" },
				{ name: "deepseek", to: "/model_deepseek" },
			],
		},
		{
			name: "AI小工具",
			href: "#pricing",
		},

		{
			name: "部落格",
			href: "#blog",
		},
		{
			name: "關於我們",
			href: "#docs",
		},
	];

	const handleGoogleLoginSuccess = async (credentialResponse: any) => {
		const jwt = credentialResponse.credential;
		console.log("前端收到 Google JWT:", jwt);
		try {
			const res = await fetch("http://localhost:8080/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ jwt: credentialResponse.credential }),
				credentials: "include", // important for cookies
			});
			console.log("後端回應狀態碼:", res.status);
			const data = await res.json();
			console.log("後端回傳資料:", data);
			if (res.ok) {
				alert("歡迎， " + (data.user?.name || data.user?.email) + " !");
				await fetchUserInfo(); // ✅ 更新登入狀態
			} else {
				alert("Google login failed: " + (data.error || "未知錯誤"));
			}
		} catch (err) {
			alert("沒post成功!!Google login error: " + err);
		}
	};

	// const fetchUserInfo = async () => {
	// 	const res = await fetch("http://localhost:8080/api/auth/me", {
	// 		credentials: "include", // ✅ 附帶 cookie
	// 	});
	// 	console.log("查詢使用者結果:", res);

	// 	const result = await res.json();
	// 	if (result.user) {
	// 		setIsLogging(true);
	// 		setUsername(result.user.name);
	// 	} else {
	// 		setIsLogging(false);
	// 		setUsername("");
	// 	}
	// };
	const { user, setUser } = useUser(); // ✅ 使用 context
	const fetchUserInfo = async () => {
		const res = await fetch("http://localhost:8080/api/auth/me", {
			credentials: "include",
		});
		const result = await res.json();
		if (result.user) {
			setUser(result.user); // ✅ 更新 context
		} else {
			setUser(null);
		}
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
			<div className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						{/* <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div> */}
						<img
							src="/AI_logo.png"
							alt="積木行銷 STACK AI"
							className="w-10 h-10 object-contain"
						/>
						<span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							積木行銷 STACK AI
						</span>
					</div>

					{/* Desktop Navigation */}
					{navItems.map((item, index) => (
						<div key={item.name} className="relative">
							{item.hasDropdown ? (
								// Dropdown button
								<button
									onClick={(e) => {
										e.stopPropagation();
										setActiveDropdown(
											activeDropdown === item.name ? null : item.name
										);
									}}
									className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
								>
									<span>{item.name}</span>
									<ChevronDown
										className={`w-4 h-4 transition-transform ${
											activeDropdown === item.name ? "rotate-180" : ""
										}`}
									/>
								</button>
							) : item.to ? (
								// Regular nav tab with React Router
								<Link
									to={item.to}
									className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
								>
									<span>{item.name}</span>
								</Link>
							) : (
								// Hash anchor fallback
								<a
									href={item.href}
									className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
								>
									<span>{item.name}</span>
								</a>
							)}

							{item.hasDropdown &&
								item.dropdownItems &&
								activeDropdown === item.name && (
									<div
										ref={(el) => (dropdownRefs.current[index] = el)}
										className="absolute left-0 mt-2 w-48 bg-background border border-gray-50 rounded-md shadow-lg z-50"
									>
										{item.dropdownItems.map((subItem) => (
											<Link
												key={subItem.name}
												to={subItem.to}
												className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black transition-colors rounded-md"
												onClick={() => setActiveDropdown(null)}
											>
												{subItem.name}
											</Link>
										))}
									</div>
								)}
						</div>
					))}

					{/* CTA Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						{user ? (
							<span className="text-white font-medium">歡迎，{user.name}!</span>
						) : (
							<GoogleLogin
								onSuccess={handleGoogleLoginSuccess}
								onError={() => alert("Google login failed")}
								theme="filled_black"
								width="120"
								size="medium"
								text="signin"
								shape="pill"
							/>
						)}

						<Button variant="accent" size="sm">
							開始使用
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden mt-4 pb-4 border-t border-border/50">
						<div className="flex flex-col space-y-4 pt-4">
							{navItems.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-foreground/80 hover:text-foreground transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</a>
							))}
							<div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
								<GoogleLogin
									onSuccess={handleGoogleLoginSuccess}
									onError={() => alert("Google login failed")}
									theme="filled_black"
									size="medium"
									text="signin"
									shape="pill"
								/>
								<Button variant="accent" size="sm">
									開始使用
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
