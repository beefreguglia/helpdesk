import { useNavigate } from "react-router";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Icon } from "@/components/icon";
import { StatusTag } from "@/components/status-tag";
import { Text } from "@/components/text";

type TechnicianCallCardProps = {
	id: string;
	name: string;
	description: string;
	date: string;
	value: string;
	clientName: string;
};

export function TechnicianCallCard({
	id,
	description,
	name,
	date,
	value,
	clientName,
}: TechnicianCallCardProps) {
	const navigate = useNavigate();

	function handleNavigate() {
		navigate(`/calls/${id}`);
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
				<div className="flex items-center gap-1">
					<Button variant="secondary" size="icon-sm">
						<Icon iconName="PenLine" />
					</Button>
					<Button size="sm" className="flex items-center gap-2">
						<Icon size="sm" iconName="CircleCheckBig" />
						<Text>Encerrar</Text>
					</Button>
				</div>
			</header>
			<main>
				<Text as="h3" variant="text-md-bold" className="text-gray-100">
					{name}
				</Text>
				<Text variant="text-sm">{description}</Text>
				<div className="flex w-full items-center justify-between py-4">
					<Text>{date}</Text>
					<Text>
						<Text>R$</Text> {value}
					</Text>
				</div>
			</main>
			<div className="flex w-full items-center justify-between border-gray-500 border-t pt-4">
				<div className="flex items-center gap-2">
					<Avatar size="xs" name={clientName} />
					<Text>{clientName}</Text>
				</div>
				<div className="flex items-center">
					<StatusTag onlyIcon variant="info" />
				</div>
			</div>
		</Card>
	);
}
