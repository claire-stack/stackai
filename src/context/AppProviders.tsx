import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>{children}</BrowserRouter>
			</TooltipProvider>
		</UserProvider>
	</QueryClientProvider>
);
