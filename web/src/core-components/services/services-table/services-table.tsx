import {
	TableBody,
	TableHeader,
	TableHeaderItem,
	TableRoot,
} from "@/components/table";
import { useServices } from "@/hooks/use-services";
import { ServicesTableItem } from "./services-table-item";

export function ServicesTable() {
	const { services } = useServices();

	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-20 md:w-full">Título</TableHeaderItem>
				<TableHeaderItem className="w-full">Valor</TableHeaderItem>
				<TableHeaderItem className="w-14 md:w-38">Status</TableHeaderItem>
				<TableHeaderItem className="w-24 md:w-38" />
			</TableHeader>
			<TableBody>
				{services.map(({ id, isActive, price, title }) => (
					<ServicesTableItem
						key={id}
						id={id}
						isActive={isActive}
						price={price}
						title={title}
					/>
				))}
			</TableBody>
		</TableRoot>
	);
}
