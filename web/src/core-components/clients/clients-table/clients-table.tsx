import {
	TableBody,
	TableHeader,
	TableHeaderItem,
	TableRoot,
} from "@/components/table";
import { ClientsTableItem } from "./clients-table-item";

export function ClientsTable() {
	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-34 md:w-full">Nome</TableHeaderItem>
				<TableHeaderItem className="w-full">E-mail</TableHeaderItem>
				<TableHeaderItem className="w-24" />
			</TableHeader>
			<TableBody>
				<ClientsTableItem />
			</TableBody>
		</TableRoot>
	);
}
