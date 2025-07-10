import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

export function ProfileDialogHeader() {
	return (
		<header className="flex items-center justify-between w-full px-6 py-5">
			<DialogTitle asChild>
				<Text variant="text-md-bold" as="h3">
					Perfil
				</Text>
			</DialogTitle>
			<DialogClose asChild>
				<Button size="icon-sm" variant="link">
					<Icon className="text-gray-300" iconName="X" />
				</Button>
			</DialogClose>
		</header>
	);
}
