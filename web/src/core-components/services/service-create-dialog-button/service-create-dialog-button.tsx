import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { Button } from "@/components/button";
import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { ServiceForm } from "../service-form";

export function ServiceCreateDialogButton() {
	return (
		<DialogRoot>
			<DialogTrigger asChild>
				<div>
					<Button className="hidden md:flex items-center gap-2">
						<Icon iconName="Plus" />
						<Text variant="text-sm">Novo</Text>
					</Button>
					<Button size="icon-md" className="flex md:hidden items-center gap-2">
						<Icon iconName="Plus" />
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent>
				<header className="flex items-center justify-between w-full px-6 py-5">
					<DialogTitle asChild>
						<Text variant="text-md-bold" as="h3">
							Cadastro de serviço
						</Text>
					</DialogTitle>
					<DialogClose asChild>
						<Button size="icon-sm" variant="link">
							<Icon className="text-gray-300" iconName="X" />
						</Button>
					</DialogClose>
				</header>
				<ServiceForm />
				<footer className="px-6 py-5">
					<Button className="w-full">Salvar</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
