import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

export function Header() {
	return (
		<header>
			<BackButton />
			<div className="flex flex-col md:flex-row w-full md:items-center gap-3 md:gap-4 justify-between mb-6">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Chamado detalhado
				</Text>
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						className="md:shrink-0 flex items-center gap-2 w-full md:w-auto"
					>
						<Icon size="lg" iconName="Clock" className="text-gray-300" />
						<Text variant="text-sm-bold" className="shrink-0">
							Em atendimento
						</Text>
					</Button>
					<Button
						variant="secondary"
						className="flex items-center gap-2 md:shrink-0 w-full md:w-auto"
					>
						<Icon iconName="CheckCircle" className="text-gray-300" />
						<Text variant="text-sm-bold">Encerrado</Text>
					</Button>
				</div>
			</div>
		</header>
	);
}
