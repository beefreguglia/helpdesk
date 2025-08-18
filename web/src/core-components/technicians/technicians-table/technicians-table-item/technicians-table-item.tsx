import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";
import { TimeTagGroup } from "../time-tag-group";

type TechniciansTableItemProps = {
	name: string;
	email: string;
	id: string;
	availability: string[];
	fileName?: string;
};

export function TechniciansTableItem({
	name,
	email,
	availability,
	id,
	fileName,
}: TechniciansTableItemProps) {
	return (
		<tr>
			<TableBodyItem>
				<div className="flex items-center gap-3">
					<Avatar fileName={fileName} size="sm" name={name} />
					<Text variant="text-sm-bold">{name}</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<Text className="hidden md:table-cell" variant="text-sm">
					{email}
				</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<TimeTagGroup id={id} maxWidth={320} times={availability} />
			</TableBodyItem>
			<TableBodyItem className="md:hidden">
				<TimeTagGroup id={id} maxWidth={100} times={availability} />
			</TableBodyItem>
			<TableBodyItem>
				<Button
					as="a"
					href={`/technicians-profile/edit/${id}`}
					variant="secondary"
					size="icon-sm"
				>
					<Icon iconName="PenLine" />
				</Button>
			</TableBodyItem>
		</tr>
	);
}
