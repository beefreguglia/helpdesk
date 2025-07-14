import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";
import { CreateCallResumeHeader } from "./create-call-resume-header";

type CreateCallResumeCardProps = {
	selectedService: Service | null;
	isSubmitting: boolean;
};

export function CreateCallResumeCard({
	selectedService,
	isSubmitting,
}: CreateCallResumeCardProps) {
	return (
		<Card size="md" className="flex flex-col gap-6 h-fit w-full md:w-3/7">
			<CreateCallResumeHeader />
			<div className="flex flex-col gap-0.5">
				<Text variant="text-xs-bold" className="text-gray-400">
					Categoria de serviço
				</Text>
				<Text variant="text-sm">{selectedService?.title ?? "-"}</Text>
			</div>
			<div className="flex flex-col gap-0.5">
				<Text variant="text-xs-bold" className="text-gray-400">
					Custo inicial
				</Text>
				<Text variant="text-lg">
					{selectedService?.price
						? formatCurrencyToBRL(selectedService.price)
						: "R$ 0,00"}
				</Text>
			</div>

			<Text className="text-gray-300" variant="text-xs">
				O chamado será automaticamente atribuído a um técnico disponível
			</Text>

			<Button form="call-form" type="submit" isLoading={isSubmitting}>
				Criar chamado
			</Button>
		</Card>
	);
}
