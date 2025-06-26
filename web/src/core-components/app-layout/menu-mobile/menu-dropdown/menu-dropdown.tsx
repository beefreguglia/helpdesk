import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/button";
import { menuItems, type MenuItem } from "@/data/menu-itens";

export function MenuDropdown() {
	const [open, setOpen] = useState(false);

	const { session } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const canViewItem = (roles: UserApiRole[]) => {
		return roles.includes(session?.user.role ?? "CLIENT");
	};

	const handleItemSelect = ({ route }: MenuItem) => {
		setOpen(false);
		navigate(route);
	};

	const isMenuItemActive = (route: string) => {
		if (route === "/") {
			return location.pathname === route;
		}

		return location.pathname.includes(route);
	};

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger asChild>
				<Button size="icon-md" className="shrink-0 outline-none">
					<Icon size="xl" iconName={open ? "X" : "Menu"} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="bg-gray-100 border border-gray-400 rounded-sm w-[calc(100vw-16px)] mx-2 mt-8.5 p-4 md:w-[348px]">
					<DropdownMenu.Label asChild>
						<Text variant="text-xxs" className="text-gray-400 mb-4">
							Menu
						</Text>
					</DropdownMenu.Label>
					<div className="flex flex-col gap-1 mt-4">
						{menuItems.map((item) =>
							canViewItem(item.userRoles) ? (
								<DropdownMenu.Item
									key={item.id}
									className={`rounded-xs p-3 flex items-center gap-3 hover:bg-gray-200 text-gray-400 cursor-pointer ${
										isMenuItemActive(item.route)
											? "bg-blue-dark text-gray-600"
											: ""
									}`}
									onSelect={() => handleItemSelect(item)}
								>
									<Icon size="xl" iconName={item.iconName} />
									<Text variant="text-sm">{item.title}</Text>
								</DropdownMenu.Item>
							) : null,
						)}
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
