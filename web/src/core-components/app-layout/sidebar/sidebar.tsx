import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";

export function Sidebar() {
	return (
		<aside className="w-[200px] hidden md:flex md:flex-col">
			<SidebarHeader />
			<SidebarNavigation />
			<SidebarFooter />
		</aside>
	);
}
