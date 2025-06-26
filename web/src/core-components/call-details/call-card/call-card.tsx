import { Avatar } from "@/components/avatar";
import { Card } from "@/components/card";
import { StatusTag } from "@/components/status-tag";
import { Text } from "@/components/text";

export function CallCard() {
	return (
		<Card size="md">
			<div className="flex items-center justify-between w-full">
				<Text variant="text-xs-bold" className="text-gray-300">
					00004
				</Text>
				<StatusTag />
			</div>
			<div className="flex flex-col gap-5">
				<Text as="h2" variant="text-md-bold" className="mt-0.5">
					Backup não está funcionando
				</Text>
				<div className="flex flex-col gap-0.5">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Descrição
					</Text>
					<Text variant="text-sm">
						O sistema de backup automático parou de funcionar. Última execução
						bem-sucedida foi há uma semana.
					</Text>
				</div>

				<div className="flex flex-col gap-0.5">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Categoria
					</Text>
					<Text variant="text-sm">Recuperação de Dados</Text>
				</div>

				<div className="flex w-full items-center gap-8">
					<div className="flex flex-col w-full gap-0.5">
						<Text as="label" variant="text-xs-bold" className="text-gray-400">
							Criado em
						</Text>
						<Text variant="text-xs">12/04/25 09:12</Text>
					</div>
					<div className="flex flex-col w-full gap-0.5">
						<Text as="label" variant="text-xs-bold" className="text-gray-400">
							Atualizado em
						</Text>
						<Text variant="text-xs">12/04/25 15:20</Text>
					</div>
				</div>

				<div className="flex flex-col gap-0.5">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Cliente
					</Text>
					<div className="flex items-center gap-2">
						<Avatar name="Teste Teste" size="xs" />
						<Text variant="text-sm">Teste Teste</Text>
					</div>
				</div>
			</div>
		</Card>
	);
}
