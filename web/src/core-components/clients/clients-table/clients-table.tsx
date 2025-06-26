import {
	TableBody,
	TableHeader,
	TableHeaderItem,
	TableRoot,
} from "@/components/table";
import { useClients } from "@/hooks/use-clients";
import { ClientsTableItem } from "./clients-table-item";

export function ClientsTable() {
	const { clients } = useClients();

	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-34 md:w-full">Nome</TableHeaderItem>
				<TableHeaderItem className="w-full">E-mail</TableHeaderItem>
				<TableHeaderItem className="w-24" />
			</TableHeader>
			<TableBody>
				{clients.map(({ email, id, name }) => (
					<ClientsTableItem email={email} id={id} name={name} key={id} />
				))}
			</TableBody>
		</TableRoot>
	);
}
