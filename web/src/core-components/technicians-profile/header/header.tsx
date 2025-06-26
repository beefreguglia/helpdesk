import { useParams } from "react-router";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { useTechnician } from "@/hooks/use-technician";

export function Header() {
	const { id } = useParams<{ id?: string }>();

	const {
		createTechnician,
		updateTechnician,
		isLoading,
		name,
		email,
		password,
		availability,
	} = useTechnician();

	async function handleSaveTechnician() {
		if (id) {
			await updateTechnician(id, {
				name,
				email,
				availability,
			});
		} else {
			await createTechnician({
				name,
				email,
				password,
				availability,
			});
		}
	}

	return (
		<header>
			<BackButton />
			<div className="flex flex-col md:flex-row w-full md:items-center gap-3 md:gap-4 justify-between mb-6">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Perfil de técnico
				</Text>
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						className="flex items-center gap-2 w-full"
						as="a"
						href="/technicians"
					>
						<Text variant="text-sm-bold">Cancelar</Text>
					</Button>
					<Button
						className="flex items-center gap-2 w-full"
						onClick={handleSaveTechnician}
						isLoading={isLoading}
					>
						<Text variant="text-sm-bold">Salvar</Text>
					</Button>
				</div>
			</div>
		</header>
	);
}
