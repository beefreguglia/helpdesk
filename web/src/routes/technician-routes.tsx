import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "@/layout/app-layout";
import { CallDetails } from "@/pages/call-details";
import { TechnicianCalls } from "@/pages/technician-calls";
import { NotFound } from "../pages/not-found";

export function TechnicianRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Navigate to="/calls" replace />} />
				<Route path="/calls" element={<TechnicianCalls />} />
				<Route path={"/calls/:id"} element={<CallDetails />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
