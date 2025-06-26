import { ActiveTag } from "@/components/active-tag";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";
import { ServiceEditDialogButton } from "../service-edit-dialog-button";

export function ServicesTableItem() {
	return (
		<tr>
			<TableBodyItem>
				<div className="flex items-center gap-3 ">
					<Text variant="text-sm-bold" className="truncate">
						Instalação de rede
					</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem>
				<Text variant="text-sm">R$ 150,00</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<ActiveTag active={false} />
			</TableBodyItem>
			<TableBodyItem className="md:hidden">
				<ActiveTag active={false} onlyIcon />
			</TableBodyItem>
			<TableBodyItem>
				<div className="flex items-center gap-2">
					<Button
						variant="link"
						size="none"
						className="flex items-center gap-2"
					>
						<Icon size="sm" iconName="Ban" />
						<Text variant="text-xs-bold" className="hidden md:inline-flex">
							Desativar
						</Text>
					</Button>
					<ServiceEditDialogButton />
				</div>
			</TableBodyItem>
		</tr>
	);
}
