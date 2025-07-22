import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
	const { session } = useAuth();

	return (
		<header>
			<BackButton />
			<div className="mb-6 flex w-full flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Chamado detalhado
				</Text>
				{session?.user.role === "TECHNICIAN" && (
					<div className="flex items-center gap-2">
						<Button
							variant="secondary"
							className="flex w-full items-center gap-2 md:w-auto md:shrink-0"
						>
							<Icon size="lg" iconName="Clock" className="text-gray-300" />
							<Text variant="text-sm-bold" className="shrink-0">
								Em atendimento
							</Text>
						</Button>
						<Button
							variant="secondary"
							className="flex w-full items-center gap-2 md:w-auto md:shrink-0"
						>
							<Icon iconName="CheckCircle" className="text-gray-300" />
							<Text variant="text-sm-bold">Encerrado</Text>
						</Button>
					</div>
				)}
			</div>
		</header>
	);
}
