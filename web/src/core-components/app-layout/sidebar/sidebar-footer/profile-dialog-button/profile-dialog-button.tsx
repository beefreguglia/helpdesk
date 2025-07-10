import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

import { Button } from "@/components/button";
import { DialogContent, DialogRoot } from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { ProfileDialogHeader } from "./profile-dialog-header";
import { RecoveryPasswordDialogButton } from "./recovery-password-dialog-button";

export function ProfileDialogButton() {
	const [openDialog, setOpenDialog] = useState(false);

	function handleOpenDialog(e: Event) {
		e.preventDefault();
		setOpenDialog(true);
	}

	return (
		<DialogRoot open={openDialog} onOpenChange={setOpenDialog}>
			<DropdownMenuItem
				onSelect={handleOpenDialog}
				className="outline-none rounded-xs px-4 py-2 flex items-center gap-3 hover:bg-gray-200 text-gray-600 cursor-pointer"
			>
				<Icon size="xl" iconName="CircleUser" />
				<Text variant="text-sm">Perfil</Text>
			</DropdownMenuItem>
			<DialogContent>
				<ProfileDialogHeader />
				<div className="border-y border-gray-500 p-6 flex flex-col gap-5">
					<Input legend="Nome" />
					<Input legend="E-mail" />
					<Input
						legend="Senha"
						type="password"
						endAdornment={<RecoveryPasswordDialogButton />}
					/>
				</div>
				<footer className="px-6 py-5 flex items-center gap-2">
					<Button className="w-full">Salvar</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
