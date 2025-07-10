import { Button } from "@/components/button";
import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Input } from "@/components/input";
import { RecoveryPasswordHeader } from "./recovery-password-header";

export function RecoveryPasswordDialogButton() {
	return (
		<DialogRoot>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Alterar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<RecoveryPasswordHeader />
				<div className="border-y border-gray-500 p-6 flex flex-col gap-5">
					<Input legend="Senha atual" type="password" />
					<Input
						legend="Nova senha"
						type="password"
						helpText="Mínimo de 6 dígitos"
					/>
				</div>
				<footer className="px-6 py-5 flex items-center gap-2">
					<Button className="w-full">Salvar</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
