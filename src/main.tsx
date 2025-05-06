import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@assets/styles/global.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { injectStore } from "./utils/axios.ts";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
injectStore(store);
const persitor = persistStore(store);
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persitor}>
				<App />
				<ToastContainer />
			</PersistGate>
		</Provider>
	</StrictMode>
);
