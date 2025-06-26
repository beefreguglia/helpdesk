import LogoLight from "@/assets/icons/logo-light.svg?react";

import { Text } from "@/components/text";
import { Icon } from "@/components/icon";
import { useAuth } from "@/hooks/use-auth";
import { MenuDropdown } from "./menu-dropdown";
import { MenuAvatar } from "./menu-avatar";

export function MenuMobile() {
	const { session } = useAuth();

	return (
		<header className="flex p-6 md:hidden">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-4 w-full">
					<MenuDropdown />
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-3">
							<Icon size="xxxl" svg={LogoLight} />
							<div className="flex flex-col">
								<Text variant="text-lg" className="text-gray-600">
									HelpDesk
								</Text>
								<Text variant="text-xxs" className="text-blue-light">
									{session?.user.role}
								</Text>
							</div>
						</div>
						<MenuAvatar />
					</div>
				</div>
			</div>
		</header>
	);
}
