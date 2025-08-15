import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/button";
import { DialogContent, DialogRoot } from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";
import { useClients } from "@/hooks/use-clients";
import { api } from "@/services/api";
import { ProfileDialogHeader } from "./profile-dialog-header";
import { RecoveryPasswordDialogButton } from "./recovery-password-dialog-button";

const updateProfileSchema = z.object({
	name: z.string().min(1, "Digite seu nome").optional(),
	email: z.string().email().min(1, "Digite seu e-mail").optional(),
});

type UpdateProfileFormInputs = z.infer<typeof updateProfileSchema>;

export function ProfileDialogButton() {
	const [openDialog, setOpenDialog] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function handleOpenDialog(e: Event) {
		e.preventDefault();
		setOpenDialog(true);
	}

	const { session, updateProfile, remove } = useAuth();

	const deleteClient = async (id: string) => {
		setIsLoading(true);
		try {
			await api.delete(`/clients/${id}`);
			remove();
			toast.success("Conta excluída com sucesso");
		} catch (err) {
			toast.error("Falha ao deletar conta. Tente novamente.");
			console.error("Erro ao deletar conta:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<UpdateProfileFormInputs>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: session?.user.name ?? "",
			email: session?.user.email ?? "",
		},
	});

	const onSubmit = useCallback(
		async (data: UpdateProfileFormInputs) => {
			if (session?.user.id) {
				await updateProfile(
					session.user.id,
					setError,
					data.name === session.user.name ? undefined : data.name,
					data.email === session.user.email ? undefined : data.email,
				);
			} else {
				toast.error("Usuário não encontrado! Tente novamente mais tarde.");
			}
		},
		[setError],
	);

	async function handleDeleteAccount() {
		await deleteClient(session?.user.id!);
	}

	return (
		<DialogRoot open={openDialog} onOpenChange={setOpenDialog}>
			<DropdownMenuItem
				onSelect={handleOpenDialog}
				className="flex cursor-pointer items-center gap-3 rounded-xs px-4 py-2 text-gray-600 outline-none hover:bg-gray-200"
			>
				<Icon size="xl" iconName="CircleUser" />
				<Text variant="text-sm">Perfil</Text>
			</DropdownMenuItem>
			<DialogContent>
				<ProfileDialogHeader />
				<form
					id="update-profile-form"
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-5 border-gray-500 border-y p-6"
				>
					<Input
						legend="Nome"
						{...register("name")}
						errorText={errors.name?.message}
					/>
					<Input
						legend="E-mail"
						{...register("email")}
						errorText={errors.email?.message}
					/>
					<Input
						legend="Senha"
						type="password"
						disabled
						placeholder="**********"
						endAdornment={<RecoveryPasswordDialogButton />}
					/>
				</form>
				<footer className="flex flex-col items-center gap-2 px-6 py-5">
					<Button
						form="update-profile-form"
						className="w-full"
						isLoading={isSubmitting}
						type="submit"
					>
						Salvar
					</Button>
					<Button
						onClick={handleDeleteAccount}
						className="w-full bg-feedback-open!"
						isLoading={isLoading}
						type="button"
					>
						Deletar conta
					</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
