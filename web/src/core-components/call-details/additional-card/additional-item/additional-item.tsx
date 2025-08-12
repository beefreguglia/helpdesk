import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";

type AdditionalItemProps = {
	title: string;
	price: number;
};

export function AdditionalItem({ price, title }: AdditionalItemProps) {
	return (
		<div className="flex items-center justify-between border-gray-500 not-first:border-t py-3">
			<Text variant="text-xs-bold">{title}</Text>
			<div className="flex items-center gap-6">
				<Text variant="text-xs">{formatCurrencyToBRL(price)}</Text>
				<Button size="icon-sm" variant="secondary">
					<Icon iconName="Trash" className="text-feedback-danger" />
				</Button>
			</div>
		</div>
	);
}
