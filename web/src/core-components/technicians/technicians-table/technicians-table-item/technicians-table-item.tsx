import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { TableBodyItem } from "@/components/table";
import { Text } from "@/components/text";
import { TimeTagGroup } from "../time-tag-group";

export function TechniciansTableItem() {
	return (
		<tr>
			<TableBodyItem>
				<div className="flex items-center gap-3">
					<Avatar size="sm" name="Técnico T" />
					<Text variant="text-sm-bold">Técnico Teste</Text>
				</div>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<Text className="hidden md:table-cell" variant="text-sm">
					tecnico@email.com.br
				</Text>
			</TableBodyItem>
			<TableBodyItem className="hidden md:table-cell">
				<TimeTagGroup
					id="00001"
					maxWidth={320}
					times={[
						"10:00",
						"11:00",
						"12:00",
						"13:00",
						"14:00",
						"15:00",
						"16:00",
						"17:00",
						"18:00",
					]}
				/>
			</TableBodyItem>
			<TableBodyItem className="md:hidden">
				<TimeTagGroup id="00001" maxWidth={100} times={["10:00", "11:00"]} />
			</TableBodyItem>
			<TableBodyItem>
				<Button
					as="a"
					href="/technicians-profile/edit"
					variant="secondary"
					size="icon-sm"
				>
					<Icon iconName="PenLine" />
				</Button>
			</TableBodyItem>
		</tr>
	);
}
