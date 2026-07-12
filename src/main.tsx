import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<LanguageProvider>
			<App />
		</LanguageProvider>
	</HelmetProvider>,
);
