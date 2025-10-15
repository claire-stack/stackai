import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId="1078692590579-ekn5fc9k8u6n86rvk45ne5h01mt3v415.apps.googleusercontent.com">
		<App />
	</GoogleOAuthProvider>
);
