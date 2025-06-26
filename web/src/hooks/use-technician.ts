import { use } from "react";

import { TechnicianContext } from "@/context/technician-context";

export function useTechnician() {
	const context = use(TechnicianContext);

	return context;
}
