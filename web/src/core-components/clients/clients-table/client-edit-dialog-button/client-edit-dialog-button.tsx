import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Avatar } from "@/components/avatar";
import { Input } from "@/components/input";

export function ClientEditDialogButton() {
	return (
		<DialogRoot>
			<DialogTrigger asChild>
				<Button variant="secondary" size="icon-sm">
					<Icon iconName="PenLine" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<header className="flex items-center justify-between w-full px-6 py-5">
					<DialogTitle asChild>
						<Text variant="text-md-bold" as="h3">
							Cliente
						</Text>
					</DialogTitle>
					<DialogClose asChild>
						<Button size="icon-sm" variant="link">
							<Icon className="text-gray-300" iconName="X" />
						</Button>
					</DialogClose>
				</header>
				<div className="border-y border-gray-500 p-6 flex flex-col gap-5">
					<Avatar name="Cliente Teste" size="lg" />
					<form className="flex flex-col gap-4">
						<Input legend="name" id="name" />
						<Input legend="E-mail" id="name" type="email" />
					</form>
				</div>
				<footer className="px-6 py-5">
					<Button className="w-full">Salvar</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
