import dayjs from "dayjs";

import { Avatar } from "@/components/avatar";
import { Card } from "@/components/card";
import { StatusTag } from "@/components/status-tag";
import { Text } from "@/components/text";

type CallCardProps = {
	id: string;
	title: string;
	description: string;
	clientName: string;
	status: CallStatus;
	createdAt: Date;
	updatedAt: Date;
};

type StatusTagVariants = "open" | "info" | "success" | "danger";

const callStatusToStatusTagVariant: Record<CallStatus, StatusTagVariants> = {
	LATE: "danger",
	OPEN: "open",
	IN_PROGRESS: "info",
	CLOSED: "success",
};

function getVariantFromStatus(status: CallStatus): string {
	const variant = callStatusToStatusTagVariant[status];
	return variant;
}

export function CallCard({
	id,
	createdAt,
	description,
	status,
	updatedAt,
	title,
	clientName,
}: CallCardProps) {
	const formattedCreatedAt = dayjs(createdAt).format("DD/MM/YYYY HH:mm");
	const formattedUpdatedAt = dayjs(updatedAt).format("DD/MM/YYYY HH:mm");

	return (
		<Card size="md">
			<div className="flex w-full items-center justify-between">
				<Text variant="text-xs-bold" className="text-gray-300">
					{id}
				</Text>
				<StatusTag
					variant={getVariantFromStatus(status) as StatusTagVariants}
				/>
			</div>
			<div className="flex flex-col gap-5">
				<Text as="h2" variant="text-md-bold" className="mt-0.5">
					{title}
				</Text>
				<div className="flex flex-col gap-0.5">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Descrição
					</Text>
					<Text variant="text-sm">{description}</Text>
				</div>

				<div className="flex flex-col gap-0.5">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Categoria
					</Text>
					<Text variant="text-sm">Recuperação de Dados</Text>
				</div>

				<div className="flex w-full items-center gap-8">
					<div className="flex w-full flex-col gap-0.5">
						<Text as="label" variant="text-xs-bold" className="text-gray-400">
							Criado em
						</Text>
						<Text variant="text-xs">{formattedCreatedAt}</Text>
					</div>
					<div className="flex w-full flex-col gap-0.5">
						<Text as="label" variant="text-xs-bold" className="text-gray-400">
							Atualizado em
						</Text>
						<Text variant="text-xs">{formattedUpdatedAt}</Text>
					</div>
				</div>

				<div className="flex flex-col gap-0.5">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Cliente
					</Text>
					<div className="flex items-center gap-2">
						<Avatar name={clientName} size="xs" />
						<Text variant="text-sm">{clientName}</Text>
					</div>
				</div>
			</div>
		</Card>
	);
}
