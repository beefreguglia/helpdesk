import { Route, Routes } from "react-router";

import { AppLayout } from "@/layout/app-layout";
import { AdminCalls } from "@/pages/admin-calls";
import { CallDetails } from "@/pages/call-details";
import { Clients } from "@/pages/clients";
import { NotFound } from "@/pages/not-found";
import { Services } from "@/pages/services";
import { Technicians } from "@/pages/technicians";
import { TechniciansProfile } from "@/pages/technicians-profile";

export function AdminRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<AdminCalls />} />
				<Route path="/technicians" element={<Technicians />} />
				<Route path={"/technicians-profile"} element={<TechniciansProfile />} />
				<Route
					path={"/technicians-profile/edit/:id"}
					element={<TechniciansProfile />}
				/>
				<Route path={"/calls/id"} element={<CallDetails />} />
				<Route path="/clients" element={<Clients />} />
				<Route path="/services" element={<Services />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
