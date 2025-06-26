import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

export function ClientDeleteDialogButton() {
	return (
		<DialogRoot>
			<DialogTrigger asChild>
				<Button variant="secondary" size="icon-sm">
					<Icon iconName="Trash2" className="text-feedback-danger" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<header className="flex items-center justify-between w-full px-6 py-5">
					<DialogTitle asChild>
						<Text variant="text-md-bold" as="h3">
							Excluir cliente
						</Text>
					</DialogTitle>
					<DialogClose asChild>
						<Button size="icon-sm" variant="link">
							<Icon className="text-gray-300" iconName="X" />
						</Button>
					</DialogClose>
				</header>
				<div className="border-y border-gray-500 p-6 flex flex-col gap-5">
					<Text as="p">
						Deseja realmente excluir{" "}
						<Text variant="text-md-bold">Cliente teste?</Text>
					</Text>
					<Text as="p">
						Ao excluir, todos os chamados deste cliente serão removidos e esta
						ação não poderá ser desfeita.
					</Text>
				</div>
				<footer className="px-6 py-5 flex items-center gap-2">
					<Button className="w-full" variant="secondary">
						Cancelar
					</Button>
					<Button className="w-full">Sim, excluir</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
