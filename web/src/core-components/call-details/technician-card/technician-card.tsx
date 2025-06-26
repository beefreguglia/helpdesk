import { Avatar } from "@/components/avatar";
import { Card } from "@/components/card";
import { Text } from "@/components/text";

export function TechnicianCard() {
	return (
		<Card size="md" className="w-full md:w-3/7 h-fit">
			<div className="flex flex-col gap-2">
				<Text as="label" variant="text-xs-bold" className="text-gray-400">
					Técnico responsável
				</Text>
				<div className="flex items-center gap-2">
					<Avatar name="Tecnico teste" />
					<div className="flex flex-col">
						<Text variant="text-sm">Tecnico teste</Text>
						<Text variant="text-xs" className="text-gray-300">
							Tecnico.teste@teste.com
						</Text>
					</div>
				</div>
			</div>
			<div className="mt-8 flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Valores
					</Text>
					<div className="flex items-center justify-between w-full">
						<Text variant="text-xs">Preço base</Text>
						<Text variant="text-xs">R$ 200</Text>
					</div>
				</div>
				<div className="mt-8 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Text as="label" variant="text-xs-bold" className="text-gray-400">
							Adicionais
						</Text>
						<div className="flex items-center justify-between w-full">
							<Text variant="text-xs">Assinatura de backup</Text>
							<Text variant="text-xs">R$ 120,00</Text>
						</div>
						<div className="flex items-center justify-between w-full">
							<Text variant="text-xs">Formatação do PC</Text>
							<Text variant="text-xs">R$ 75,00</Text>
						</div>
						<div className="mt-8 flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between w-full border-t border-gray-500">
									<Text variant="text-sm-bold" className="text-gray-300 mt-3">
										Total
									</Text>
									<Text variant="text-sm-bold" className="text-gray-300">
										R$ 395,00
									</Text>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
