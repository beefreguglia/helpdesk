import {
	TableBody,
	TableHeaderItem,
	TableRoot,
	TableHeader,
} from "@/components/table";

import { TechniciansTableItem } from "./technicians-table-item";

export function TechniciansTable() {
	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-full">Nome</TableHeaderItem>
				<TableHeaderItem className="hidden md:table-cell w-full">
					E-mail
				</TableHeaderItem>
				<TableHeaderItem className="w-30 md:w-[27.5rem]">
					Disponibilidade
				</TableHeaderItem>
				<TableHeaderItem className="w-16" />
			</TableHeader>
			<TableBody>
				<TechniciansTableItem />
			</TableBody>
		</TableRoot>
	);
}
