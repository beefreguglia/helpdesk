import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { CreateCallResumeHeader } from "./create-call-resume-header";

export function CreateCallResumeCard() {
	return (
		<Card size="md" className="flex flex-col gap-6 h-fit w-full md:w-3/7">
			<CreateCallResumeHeader />
			<div className="flex flex-col gap-0.5">
				<Text variant="text-xs-bold" className="text-gray-400">
					Categoria de serviço
				</Text>
				<Text variant="text-sm">Categoria de serviço</Text>
			</div>
			<div className="flex flex-col gap-0.5">
				<Text variant="text-xs-bold" className="text-gray-400">
					Custo inicial
				</Text>
				<Text variant="text-lg">R$ 200,00</Text>
			</div>

			<Text className="text-gray-300" variant="text-xs">
				O chamado será automaticamente atribuído a um técnico disponível
			</Text>

			<Button>Criar chamado</Button>
		</Card>
	);
}
