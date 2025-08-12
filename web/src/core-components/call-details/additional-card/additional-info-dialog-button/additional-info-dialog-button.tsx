import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/button";
import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Text } from "@/components/text";
import { useCall } from "@/hooks/use-call";
import { useServicesActive } from "@/hooks/use-service-active";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";

export function AdditionalInfoDialogButton() {
	const [isOpen, setIsOpen] = useState(false);
	const { services } = useServicesActive();
	const { call, createAdditionalService, isCreatingAdditionalService } =
		useCall();

	const [selectedService, setSelectedService] = useState<Service>(
		{} as Service,
	);

	function handleSelectService(serviceId: string) {
		const foundService = services.find((service) => service.id === serviceId);

		if (foundService) {
			setSelectedService(foundService);
		}
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		await createAdditionalService(selectedService.id, call?.id!);
		setIsOpen(false);
		setSelectedService({} as Service);
	}

	return (
		<DialogRoot open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="icon-sm">
					<Icon iconName="Plus" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<header className="flex w-full items-center justify-between px-6 py-5">
					<DialogTitle asChild>
						<Text variant="text-md-bold" as="h3">
							Serviço adicional
						</Text>
					</DialogTitle>
					<DialogClose asChild>
						<Button size="icon-sm" variant="link">
							<Icon className="text-gray-300" iconName="X" />
						</Button>
					</DialogClose>
				</header>
				<form
					id="additional-service-form"
					className="flex min-h-40 flex-col gap-4 px-6 py-5"
					onSubmit={(e) => handleSubmit(e)}
				>
					<Select
						placeholder="Selecione a categoria de atendimento"
						legend="Categoria de serviço"
						onChange={(e) => handleSelectService(e.target.value)}
						required
					>
						{services.map((service) => (
							<option key={service.id} value={service.id}>
								{service.title}
							</option>
						))}
					</Select>
					{selectedService.price && (
						<Input
							value={formatCurrencyToBRL(selectedService.price)}
							disabled
							legend="Valor"
						/>
					)}
				</form>
				<footer className="flex items-center gap-2 px-6 py-5">
					<Button
						type="submit"
						form="additional-service-form"
						className="w-full"
						isLoading={isCreatingAdditionalService}
						disabled={!selectedService.id}
					>
						Salvar
					</Button>
				</footer>
			</DialogContent>
		</DialogRoot>
	);
}
