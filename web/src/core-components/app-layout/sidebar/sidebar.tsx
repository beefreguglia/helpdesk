import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNavigation } from "./sidebar-navigation";

export function Sidebar() {
	return (
		<aside className="hidden w-[200px] md:flex md:flex-col">
			<SidebarHeader />
			<SidebarNavigation />
			<SidebarFooter />
		</aside>
	);
}
