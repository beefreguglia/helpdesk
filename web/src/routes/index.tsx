import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./auth-routes";
import { useAuth } from "../hooks/use-auth";
import { AdminRoutes } from "./admin-routes";
import { ClientRoutes } from "./client-routes";
import { Loading } from "../components/loading";
import { TechnicianRoutes } from "./technician-routes";

export function Routes() {
	const { session, isLoading } = useAuth();

	function Route() {
		switch (session?.user.role) {
			case "ADMIN":
				return <AdminRoutes />;
			case "TECHNICIAN":
				return <TechnicianRoutes />;
			case "CLIENT":
				return <ClientRoutes />;
			default:
				return <AuthRoutes />;
		}
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<BrowserRouter>
			<Route />
		</BrowserRouter>
	);
}
