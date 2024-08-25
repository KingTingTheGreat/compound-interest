import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ValuesContextProvider } from "./context/valuesContext.tsx";
import "./style.css";

createRoot(document.getElementById("root")!).render(
	<ValuesContextProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</ValuesContextProvider>
);
