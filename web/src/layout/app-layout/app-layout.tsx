import { Outlet } from "react-router";
import { MenuMobile } from "@/core-components/app-layout/menu-mobile";
import { Sidebar } from "@/core-components/app-layout/sidebar";

export function AppLayout() {
	return (
		<div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100 text-gray-200 md:flex-row md:justify-end md:pt-3">
			<MenuMobile />
			<Sidebar />
			<Outlet />
		</div>
	);
}
