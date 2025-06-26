import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Client = {
	id: string;
	name: string;
	email: string;
};

type ClientEditDialogButtonProps = {
	id: string;
};

export function ClientEditDialogButton({ id }: ClientEditDialogButtonProps) {
	const [clientData, setClientData] = useState<Client | null>(null);
	const [formData, setFormData] = useState({ name: "", email: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const queryClient = useQueryClient();

	const clientsQueryKey = ["", "clients"];

	const fetchClient = async (clientId: string) => {
		setIsLoading(true);

		try {
			const response = await api.get(`/clients/${clientId}`);
			const data: Client = response.data;
			setClientData(data);
			setFormData({ name: data.name, email: data.email });
		} catch (err) {
			console.log(err);
			toast.error("Falha ao carregar os dados do cliente. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateClient = async (
		clientId: string,
		updatedData: Partial<Client>,
	) => {
		setIsLoading(true);
		try {
			await api.put(`/clients/${clientId}`, updatedData);

			queryClient.invalidateQueries({
				queryKey: clientsQueryKey,
			});

			toast.success("Cliente atualizado com sucesso!");
			setIsDialogOpen(false);
		} catch (err) {
			toast.error("Falha ao atualizar os dados do cliente. Tente novamente.");
			console.error("Erro ao atualizar cliente:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isDialogOpen && id) {
			fetchClient(id);
		}
	}, [isDialogOpen, id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateClient(id, formData);
		setIsDialogOpen(false);
	};

	return (
		<DialogRoot onOpenChange={setIsDialogOpen} open={isDialogOpen}>
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
					{isLoading && <Text>Carregando dados do cliente...</Text>}
					{!isLoading && clientData && (
						<>
							<Avatar name={clientData.name} size="lg" />
							<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
								<Input
									legend="Nome"
									id="name"
									value={formData.name}
									onChange={handleInputChange}
								/>
								<Input
									legend="E-mail"
									id="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
								/>
								<footer className="px-6 py-5">
									<Button
										className="w-full"
										type="submit"
										isLoading={isLoading}
									>
										{isLoading ? "Salvando..." : "Salvar"}
									</Button>
								</footer>
							</form>
						</>
					)}
				</div>
			</DialogContent>
		</DialogRoot>
	);
}
