import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { AdditionalInfoDialogButton } from "./additional-info-dialog-button";
import { AdditionalItem } from "./additional-item";

type AdditionalCardProps = {
	services: { title: string; price: number }[];
};

export function AdditionalCard({ services }: AdditionalCardProps) {
	const [_, ...additionalServices] = services;

	return (
		<Card size="md">
			<header className="flex items-end justify-between">
				<Text variant="text-xs-bold" className="text-gray-400">
					Serviços adicionais
				</Text>
				<AdditionalInfoDialogButton />
			</header>
			<main className="mt-4">
				{additionalServices.map((additionalService) => (
					<AdditionalItem key={additionalService.title} />
				))}
			</main>
		</Card>
	);
}
