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
				<TableHeaderItem className="hidden w-34 md:table-cell">
					Id
				</TableHeaderItem>
				<TableHeaderItem className="w-full">Título</TableHeaderItem>
				<TableHeaderItem className="w-full">Serviço</TableHeaderItem>
				<TableHeaderItem className="hidden w-60 md:table-cell">
					Valor Total
				</TableHeaderItem>
				<TableHeaderItem className="hidden w-64 md:table-cell">
					Cliente
				</TableHeaderItem>
				<TableHeaderItem className="hidden w-64 md:table-cell">
					Técnico
				</TableHeaderItem>
				<TableHeaderItem className="w-16 md:w-40">Status</TableHeaderItem>
				<TableHeaderItem className="w-16" />
			</TableHeader>
			<TableBody>
				{calls.map(
					({
						id,
						title,
						client,
						status,
						technician,
						callServices,
						updatedAt,
					}) => (
						<CallsTableItem
							key={id}
							id={id}
							title={title}
							client={client}
							status={status}
							technician={technician}
							callService={callServices[0]}
							updatedAt={updatedAt}
						/>
					),
				)}
			</TableBody>
		</TableRoot>
	);
}
