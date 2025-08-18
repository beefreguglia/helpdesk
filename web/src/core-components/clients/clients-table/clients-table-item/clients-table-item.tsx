import { Avatar } from "@/components/avatar";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";
import { ClientDeleteDialogButton } from "../client-delete-dialog-button";
import { ClientEditDialogButton } from "../client-edit-dialog-button";

type ClientsTableItemProps = {
	id: string;
	name: string;
	email: string;
	imageName?: string;
};

export function ClientsTableItem({
	email,
	name,
	id,
	imageName,
}: ClientsTableItemProps) {
	return (
		<tr>
			<TableBodyItem>
				<div className="flex items-center gap-3 ">
					<Avatar
						size="sm"
						name={name}
						fileName={imageName}
						className="shrink-0"
					/>
					<Text variant="text-sm-bold" className="truncate">
						{name}
					</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="truncate">
				<Text variant="text-sm">{email}</Text>
			</TableBodyItem>
			<TableBodyItem>
				<div className="flex items-center gap-2">
					<ClientDeleteDialogButton id={id} />
					<ClientEditDialogButton id={id} />
				</div>
			</TableBodyItem>
		</tr>
	);
}
