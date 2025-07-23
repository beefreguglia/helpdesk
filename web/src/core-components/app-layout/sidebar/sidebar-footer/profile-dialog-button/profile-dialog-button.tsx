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
import { ProfileDialogHeader } from "./profile-dialog-header";
import { RecoveryPasswordDialogButton } from "./recovery-password-dialog-button";

const updateProfileSchema = z.object({
	name: z.string().min(1, "Digite seu nome").optional(),
	email: z.string().email().min(1, "Digite seu e-mail").optional(),
});

type UpdateProfileFormInputs = z.infer<typeof updateProfileSchema>;

export function ProfileDialogButton() {
	const [openDialog, setOpenDialog] = useState(false);

	function handleOpenDialog(e: Event) {
		e.preventDefault();
		setOpenDialog(true);
	}

	const { session, updateProfile } = useAuth();

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
				<footer className="flex items-center gap-2 px-6 py-5">
					<Button
						form="update-profile-form"
						className="w-full"
						isLoading={isSubmitting}
						type="submit"
					>
						Salvar
					</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
