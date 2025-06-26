import {
	TableBody,
	TableHeaderItem,
	TableRoot,
	TableHeader,
} from "@/components/table";

import { CallsTableItem } from "./calls-table-item";

export function CallsTable() {
	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-[88px] md:w-32">
					Atualizado em
				</TableHeaderItem>
				<TableHeaderItem className="hidden md:table-cell w-24">
					Id
				</TableHeaderItem>
				<TableHeaderItem className="w-full">Título e Serviço</TableHeaderItem>
				<TableHeaderItem className="w-60 hidden md:table-cell">
					Valor Total
				</TableHeaderItem>
				<TableHeaderItem className="w-64 hidden md:table-cell">
					Cliente
				</TableHeaderItem>
				<TableHeaderItem className="w-64 hidden md:table-cell">
					Técnico
				</TableHeaderItem>
				<TableHeaderItem className="w-16 md:w-40">Status</TableHeaderItem>
				<TableHeaderItem className="w-16" />
			</TableHeader>
			<TableBody>
				<CallsTableItem />
			</TableBody>
		</TableRoot>
	);
}
