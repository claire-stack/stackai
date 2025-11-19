import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

// 只拿 user
export const useCurrentUser = () => {
  const ctx = useContext(UserContext);
  return ctx?.user;
};

// 拿 user 和 setUser
export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUserContext must be used within a UserProvider");
  return ctx;
};
