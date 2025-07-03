import { Text } from "@/components/text";

export function CreateCallInformationHeader() {
	return (
		<header className="flex flex-col gap-1 mb-6">
			<Text variant="text-md-bold" className="text-gray-200">
				Informações
			</Text>
			<Text variant="text-xs" className="text-gray-300">
				Configure os dias e horários em que você está disponível para atender
				chamados
			</Text>
		</header>
	);
}
