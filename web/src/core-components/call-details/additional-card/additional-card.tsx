import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { AdditionalItem } from "./additional-item";
import { AdditionalInfoDialogButton } from "./additional-info-dialog-button";

export function AdditionalCard() {
	return (
		<Card size="md">
			<header className="flex items-end justify-between">
				<Text variant="text-xs-bold" className="text-gray-400">
					Serviços adicionais
				</Text>
				<AdditionalInfoDialogButton />
			</header>
			<main className="mt-4">
				<AdditionalItem />
				<AdditionalItem />
			</main>
		</Card>
	);
}
