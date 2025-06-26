import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/input";

export function AdditionalInfoDialogButton() {
	return (
		<DialogRoot>
			<DialogTrigger asChild>
				<Button size="icon-sm">
					<Icon iconName="Plus" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<header className="flex items-center justify-between w-full px-6 py-5">
					<DialogTitle asChild>
						<Text variant="text-md-bold" as="h3">
							Serviço adicional
						</Text>
					</DialogTitle>
					<DialogClose asChild>
						<Button size="icon-sm" variant="link">
							<Icon className="text-gray-300" iconName="X" />
						</Button>
					</DialogClose>
				</header>
				<div className="border-y border-gray-500 p-6 flex flex-col gap-5">
					<Input legend="Título" />
					<Input legend="Valor" />
				</div>
				<footer className="px-6 py-5 flex items-center gap-2">
					<Button className="w-full">Salvar</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
