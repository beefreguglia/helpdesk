import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { StatusTag } from "@/components/status-tag";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";

type CallsTableItemProps = {
	id: string;
	title: string;
	description: string;
};

export function CallsTableItem({
	id,
	title,
	description,
}: CallsTableItemProps) {
	return (
		<tr>
			<TableBodyItem>
				<div className="flex flex-col md:flex-row md:gap-1">
					<Text variant="text-xs">13/04/25</Text>
					<Text variant="text-xs">20:56</Text>
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
				<Text as="p" variant="text-xs">
					{description}
				</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<Text variant="text-sm">R$ 50000</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<div className="flex items-center gap-2">
					<Avatar size="xs" name="Cliente T" />
					<Text variant="text-sm">Cliente Teste</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<div className="flex items-center gap-2">
					<Avatar size="xs" name="Técnico T" />
					<Text variant="text-sm">Técnico Teste</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="w-16">
				<StatusTag variant="info" />
			</TableBodyItem>
			<TableBodyItem>
				<Button as="a" href="/calls/id" variant="secondary" size="icon-sm">
					<Icon iconName="Eye" />
				</Button>
			</TableBodyItem>
		</tr>
	);
}
