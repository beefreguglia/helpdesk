import { use } from "react";

import { CallContext } from "@/context/call-context";

export function useCall() {
	const context = use(CallContext);

	return context;
}
