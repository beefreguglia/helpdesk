import { useQueryClient } from "@tanstack/react-query";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Icon } from "@/components/icon";
import { StatusTag } from "@/components/status-tag";
import { Text } from "@/components/text";
import { useCall } from "@/hooks/use-call";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";

type TechnicianCallCardProps = {
	id: string;
	name: string;
	description: string;
	date: string;
	status: CallStatus;
	clientName: string;
	callServices: CallService[];
};

const statusToVariant: Record<
	CallStatus,
	"open" | "info" | "success" | "danger"
> = {
	OPEN: "open",
	IN_PROGRESS: "info",
	CLOSED: "success",
	LATE: "danger",
};

function getVariantName(status: CallStatus) {
	return statusToVariant[status];
}

export function TechnicianCallCard({
	id,
	description,
	name,
	date,
	status,
	clientName,
	callServices,
}: TechnicianCallCardProps) {
	const navigate = useNavigate();
	const { finishCall, startCall } = useCall();
	const queryClient = useQueryClient();

	function handleNavigate() {
		navigate(`/calls/${id}`);
	}

	const totalPrice = callServices.reduce((acc, callService) => {
		return Number(callService.service.price) + acc;
	}, 0);

	async function handleFinishCall(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		await finishCall(id);
		queryClient.invalidateQueries({ queryKey: ["", "calls"] });
	}

	async function handleStartCall(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		await startCall(id);
		queryClient.invalidateQueries({ queryKey: ["", "calls"] });
	}

	return (
		<Card
			size="md"
			className="w-full max-w-96 cursor-pointer"
			onClick={handleNavigate}
		>
			<header className="flex w-full items-end justify-between">
				<Text variant="text-xs-bold" className="text-gray-400">
					{id}
				</Text>
				{status === "IN_PROGRESS" && (
					<div className="flex items-center gap-1">
						<Button variant="secondary" size="icon-sm">
							<Icon iconName="PenLine" />
						</Button>
						<Button
							onClick={(e) => handleFinishCall(e)}
							size="sm"
							className="flex items-center gap-2"
						>
							<Icon size="sm" iconName="CircleCheckBig" />
							<Text>Encerrar</Text>
						</Button>
					</div>
				)}
				{status === "OPEN" && (
					<div className="flex items-center gap-1">
						<Button variant="secondary" size="icon-sm">
							<Icon iconName="PenLine" />
						</Button>
						<Button
							onClick={(e) => handleStartCall(e)}
							size="sm"
							className="flex items-center gap-2"
						>
							<Icon size="sm" iconName="CircleCheckBig" />
							<Text>Iniciar</Text>
						</Button>
					</div>
				)}
			</header>
			<main>
				<Text as="h3" variant="text-md-bold" className="text-gray-100">
					{name}
				</Text>
				<Text variant="text-sm">{description}</Text>
				<div className="flex w-full items-center justify-between py-4">
					<Text>{date}</Text>
					<Text>{formatCurrencyToBRL(totalPrice)}</Text>
				</div>
			</main>
			<div className="flex w-full items-center justify-between border-gray-500 border-t pt-4">
				<div className="flex items-center gap-2">
					<Avatar size="xs" name={clientName} />
					<Text>{clientName}</Text>
				</div>
				<div className="flex items-center">
					<StatusTag onlyIcon variant={getVariantName(status)} />
				</div>
			</div>
		</Card>
	);
}
