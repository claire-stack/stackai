import { Routes, Route } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Model_OpenAI from "./pages/OpenAI";
import Pricing from "./pages/Pricing";

const App = () => (
	<AppProviders>
		<Routes>
			<Route path="/" element={<Index />} />
			{/* Nav Bar  */}
			<Route path="/nav_pricing" element={<Pricing />} />
			{/* Nav_Model  */}
			<Route path="/model_OpenAI" element={<Model_OpenAI />} />
			{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	</AppProviders>
);

export default App;
