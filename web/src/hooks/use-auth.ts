import { use } from "react";
import { AuthContext } from "../context/auth-context";

export function useAuth() {
	const context = use(AuthContext);

	return context;
}
