import { Route, Routes } from "react-router";

import { NotFound } from "../pages/not-found";
import { AppLayout } from "@/layout/app-layout";
import { TechnicianCalls } from "@/pages/technician-calls";
import { CallDetails } from "@/pages/call-details";

export function TechnicianRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<TechnicianCalls />} />
				<Route path={"/calls/id"} element={<CallDetails />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
