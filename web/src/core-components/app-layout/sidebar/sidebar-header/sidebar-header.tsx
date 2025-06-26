import LogoLight from "@/assets/icons/logo-light.svg?react";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";

export function SidebarHeader() {
	const { session } = useAuth();

	return (
		<header className="flex items-center w-full gap-3 px-5 py-6">
			<Icon size="xxxl" svg={LogoLight} className="shrink-0" />
			<div className="flex flex-col">
				<Text variant="text-lg" className="text-gray-600">
					HelpDesk
				</Text>
				<Text variant="text-xxs" className="text-blue-light">
					{session?.user.role}
				</Text>
			</div>
		</header>
	);
}
