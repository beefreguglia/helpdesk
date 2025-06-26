import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";

export function NavigationCard() {
	return (
		<Card size="md" className="w-full flex flex-col gap-6">
			<div className="flex flex-col gap-0.5">
				<Text variant="text-md" as="h2">
					Ainda não tem uma conta?
				</Text>
				<Text as="span" variant="text-xs" className="text-gray-300">
					Cadastre agora mesmo
				</Text>
			</div>
			<Button as="a" href="/signup" variant="secondary">
				Criar conta
			</Button>
		</Card>
	);
}
