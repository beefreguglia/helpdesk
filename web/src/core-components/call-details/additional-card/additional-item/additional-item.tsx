import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

export function AdditionalItem() {
	return (
		<div className="flex items-center justify-between not-first:border-t border-gray-500 py-3">
			<Text variant="text-xs-bold">Assinatura de backup</Text>
			<div className="flex items-center gap-6">
				<Text variant="text-xs">R$ 120,00</Text>
				<Button size="icon-sm" variant="secondary">
					<Icon iconName="Trash" className="text-feedback-danger" />
				</Button>
			</div>
		</div>
	);
}
