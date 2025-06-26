import { MenuMobile } from "@/core-components/app-layout/menu-mobile";
import { Sidebar } from "@/core-components/app-layout/sidebar";
import { Outlet } from "react-router";

export function AppLayout() {
	return (
		<div className="flex h-screen w-screen flex-col md:pt-3 overflow-hidden md:flex-row md:justify-end bg-gray-100 text-gray-200">
			<MenuMobile />
			<Sidebar />
			<Outlet />
		</div>
	);
}
