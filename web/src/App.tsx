import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context";
import { Routes } from "./routes";

export function App() {
	return (
		<AuthProvider>
			<Routes />
			<Toaster richColors closeButton position="bottom-center" />
		</AuthProvider>
	);
}
