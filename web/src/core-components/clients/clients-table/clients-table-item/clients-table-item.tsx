import { Text } from "@/components/text";
import { Avatar } from "@/components/avatar";
import { TableBodyItem } from "@/components/table";
import { ClientEditDialogButton } from "../client-edit-dialog-button";
import { ClientDeleteDialogButton } from "../client-delete-dialog-button";

export function ClientsTableItem() {
	return (
		<tr>
			<TableBodyItem>
				<div className="flex items-center gap-3 ">
					<Avatar size="sm" name="Técnico T" className="shrink-0" />
					<Text variant="text-sm-bold" className="truncate">
						Cliente teste
					</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="truncate">
				<Text variant="text-sm">cliente@email.com.br</Text>
			</TableBodyItem>
			<TableBodyItem>
				<div className="flex items-center gap-2">
					<ClientDeleteDialogButton />
					<ClientEditDialogButton />
				</div>
			</TableBodyItem>
		</tr>
	);
}
