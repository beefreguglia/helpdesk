import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { api } from "@/services/api";

type ClientDeleteDialogButtonProps = {
	id: string;
};

export function ClientDeleteDialogButton({
	id,
}: ClientDeleteDialogButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const queryClient = useQueryClient();

	const deleteClient = async (id: string) => {
		setIsLoading(true);
		try {
			await api.delete(`/clients/${id}`);

			queryClient.invalidateQueries({
				queryKey: ["", "clients"],
			});

			toast.success("Cliente deletado com sucesso!");
			setIsDialogOpen(false);
		} catch (err) {
			toast.error("Falha ao deletar os dados do cliente. Tente novamente.");
			console.error("Erro ao deletar cliente:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
					<Button
						className="w-full"
						isLoading={isLoading}
						onClick={() => deleteClient(id)}
					>
						Sim, excluir
					</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
