import dayjs from "dayjs";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { StatusTag } from "@/components/status-tag";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";

type CallsTableItemProps = {
	id: string;
	title: string;
	status: CallStatus;
	updatedAt: Date;
	client: { name: string };
	technician: { name: string };
	callService: CallService;
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

export function CallsTableItem({
	id,
	title,
	client,
	status,
	technician,
	callService,
	updatedAt,
}: CallsTableItemProps) {
	const formattedDate = dayjs(updatedAt).format("DD/MM/YYYY")
	const formattedHour = dayjs(updatedAt).format("HH:mm")

	return (
		<tr>
			<TableBodyItem>
				<div className="flex flex-col md:flex-row md:gap-1">
					<Text variant="text-xs">{formattedDate}</Text>
					<Text variant="text-xs">{formattedHour}</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<Text className="hidden md:table-cell" variant="text-xs-bold">
					{id}
				</Text>
			</TableBodyItem>
			<TableBodyItem>
				<Text as="p" variant="text-sm-bold">
					{title}
				</Text>
			</TableBodyItem>
			<TableBodyItem>
				<Text as="p" variant="text-sm-bold">
					{callService.service.title}
				</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<Text variant="text-sm">
					{formatCurrencyToBRL(callService.priceAtTimeOfService)}
				</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<div className="flex items-center gap-2">
					<Avatar size="xs" name={client.name} />
					<Text variant="text-sm">{client.name}</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<div className="flex items-center gap-2">
					<Avatar size="xs" name={technician.name} />
					<Text variant="text-sm">{technician.name}</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="w-16">
				<StatusTag
					variant={
						getVariantFromStatus(status) as
							| "open"
							| "info"
							| "success"
							| "danger"
					}
				/>
			</TableBodyItem>
			<TableBodyItem>
				<Button as="a" href={`/calls/${id}`} variant="secondary" size="icon-sm">
					<Icon iconName="Eye" />
				</Button>
			</TableBodyItem>
		</tr>
	);
}
