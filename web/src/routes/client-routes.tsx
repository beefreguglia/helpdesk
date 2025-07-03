import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layout/app-layout";
import { CallDetails } from "@/pages/call-details";
import { Calls } from "@/pages/calls";
import { CreateCall } from "@/pages/create-call";
import { NotFound } from "../pages/not-found";

export function ClientRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Navigate to="/calls" replace />} />

				<Route path="/calls" element={<Calls />} />
				<Route path="/create-call" element={<CreateCall />} />
				<Route path="/calls/:id" element={<CallDetails />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
