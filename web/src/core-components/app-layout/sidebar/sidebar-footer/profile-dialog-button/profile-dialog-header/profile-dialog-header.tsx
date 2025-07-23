import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

export function ProfileDialogHeader() {
	return (
		<header className="flex w-full items-center justify-between px-6 py-5">
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
