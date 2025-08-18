import {
	TableBody,
	TableHeader,
	TableHeaderItem,
	TableRoot,
} from "@/components/table";
import { useTechnicians } from "@/hooks/use-technicians";
import { TechniciansTableItem } from "./technicians-table-item";

export function TechniciansTable() {
	const { technicians } = useTechnicians();

	return (
		<TableRoot>
			<TableHeader>
				<TableHeaderItem className="w-full">Nome</TableHeaderItem>
				<TableHeaderItem className="hidden w-full md:table-cell">
					E-mail
				</TableHeaderItem>
				<TableHeaderItem className="w-30 md:w-[27.5rem]">
					Disponibilidade
				</TableHeaderItem>
				<TableHeaderItem className="w-16" />
			</TableHeader>
			<TableBody>
				{technicians.map(({ availability, email, id, name, imageName }) => (
					<TechniciansTableItem
						key={id}
						id={id}
						email={email}
						name={name}
						availability={availability}
						fileName={imageName}
					/>
				))}
			</TableBody>
		</TableRoot>
	);
}
