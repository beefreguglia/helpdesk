import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

export function RecoveryPasswordHeader() {
	return (
		<header className="flex items-center justify-between w-full px-6 py-5">
			<div className="flex items-center gap-3">
				<DialogClose asChild>
					<Button
						size="icon-sm"
						variant="link"
						className="flex items-center gap-2"
					>
						<Icon size="sm" iconName="ArrowLeft" />
					</Button>
				</DialogClose>
				<DialogTitle asChild>
					<Text variant="text-md-bold" as="h3">
						Alterar senha
					</Text>
				</DialogTitle>
			</div>
			<DialogClose asChild>
				<Button size="icon-sm" variant="link">
					<Icon className="text-gray-300" iconName="X" />
				</Button>
			</DialogClose>
		</header>
	);
}
