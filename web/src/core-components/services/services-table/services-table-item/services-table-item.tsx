import { ActiveTag } from "@/components/active-tag";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Loading } from "@/components/loading";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";
import { useService } from "@/hooks/use-service";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";
import { ServiceEditDialogButton } from "../service-edit-dialog-button";

type ServicesTableItemProps = {
	title: string;
	price: number;
	isActive: boolean;
	id: string;
};

export function ServicesTableItem({
	isActive,
	price,
	title,
	id,
}: ServicesTableItemProps) {
	const {
		activeService,
		inactiveService,
		isActivatingService,
		isGettingService,
	} = useService();

	if (isGettingService) {
		return <Loading />;
	}
	return (
		<tr>
			<TableBodyItem>
				<div className="flex items-center gap-3 ">
					<Text variant="text-sm-bold" className="truncate">
						{title}
					</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem>
				<Text variant="text-sm">{formatCurrencyToBRL(price)}</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<ActiveTag active={isActive} />
			</TableBodyItem>
			<TableBodyItem className="md:hidden">
				<ActiveTag active={isActive} onlyIcon />
			</TableBodyItem>
			<TableBodyItem>
				<div className="flex items-center justify-end gap-2">
					{isActive ? (
						<Button
							variant="link"
							size="none"
							className="flex items-center gap-2"
							onClick={() => inactiveService(id)}
							isLoading={isActivatingService}
						>
							<Icon size="sm" iconName="Ban" />
							<Text variant="text-xs-bold" className="hidden md:inline-flex">
								Desativar
							</Text>
						</Button>
					) : (
						<Button
							variant="link"
							size="none"
							className="flex items-center gap-2"
							isLoading={isActivatingService}
							onClick={() => activeService(id)}
						>
							<Icon size="sm" iconName="CheckCircle" />
							<Text variant="text-xs-bold" className="hidden md:inline-flex">
								Ativar
							</Text>
						</Button>
					)}

					<ServiceEditDialogButton id={id} />
				</div>
			</TableBodyItem>
		</tr>
	);
}
