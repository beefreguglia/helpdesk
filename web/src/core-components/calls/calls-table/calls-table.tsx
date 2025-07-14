import {
	TableBody,
	TableHeader,
	TableHeaderItem,
	TableRoot,
} from "@/components/table";

import { useCalls } from "@/hooks/use-calls";
import { CallsTableItem } from "./calls-table-item";

export function CallsTable() {
	const { calls } = useCalls();

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
				{calls.map(({ id, title, description }) => (
					<CallsTableItem
						key={id}
						id={id}
						title={title}
						description={description}
					/>
				))}
			</TableBody>
		</TableRoot>
	);
}
