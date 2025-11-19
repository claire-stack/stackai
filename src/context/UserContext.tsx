// context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<{
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch("http://localhost:8080/api/auth/me", { credentials: "include" })
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => setUser(data?.user || null))
			.catch(() => setUser(null));
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
