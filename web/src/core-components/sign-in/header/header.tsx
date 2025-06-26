import LogoDark from "../../../assets/icons/logo-dark.svg?react";

import { Icon } from "../../../components/icon";
import { Text } from "../../../components/text";

export function Header() {
	return (
		<header className="flex items-center justify-center gap-3">
			<Icon size="xxl" svg={LogoDark} />
			<Text variant="text-xl" className="text-blue-dark!">
				HelpDesk
			</Text>
		</header>
	);
}
