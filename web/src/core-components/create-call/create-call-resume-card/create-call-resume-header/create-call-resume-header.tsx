import { Text } from "@/components/text";

export function CreateCallResumeHeader() {
	return (
		<header className="flex flex-col gap-1">
			<Text variant="text-md-bold" className="text-gray-200">
				Resumo
			</Text>
			<Text variant="text-xs" className="text-gray-300">
				Valores e detalhes
			</Text>
		</header>
	);
}
