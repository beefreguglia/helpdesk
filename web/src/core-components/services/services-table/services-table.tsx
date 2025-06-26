import {
	TableBody,
	TableHeader,
	TableHeaderItem,
	TableRoot,
} from "@/components/table";
import { ServicesTableItem } from "./services-table-item";

export function ServicesTable() {
	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-20 md:w-full">Título</TableHeaderItem>
				<TableHeaderItem className="w-full">Valor</TableHeaderItem>
				<TableHeaderItem className="w-14 md:w-38">Status</TableHeaderItem>
				<TableHeaderItem className="w-24 md:w-38" />
			</TableHeader>
			<TableBody>
				<ServicesTableItem />
			</TableBody>
		</TableRoot>
	);
}
