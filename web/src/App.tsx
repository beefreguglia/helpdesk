import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context";
import { Routes } from "./routes";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Routes />
				<Toaster richColors closeButton position="bottom-center" />
			</AuthProvider>
		</QueryClientProvider>
	);
}
