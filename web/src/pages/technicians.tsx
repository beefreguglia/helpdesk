import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { TechniciansTable } from "@/core-components/technicians/technicians-table/technicians-table";

export function Technicians() {
	return (
		<main className="h-screen flex-1 rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<div className="mb-6 flex w-full items-center justify-between gap-4">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Técnicos
				</Text>
				<Button
					as="a"
					href="/technicians-profile"
					className="hidden items-center gap-2 md:flex"
				>
					<Icon iconName="Plus" />
					<Text variant="text-sm">Novo</Text>
				</Button>
				<Button
					as="a"
					href="/technicians-profile"
					size="icon-md"
					className="flex items-center gap-2 md:hidden"
				>
					<Icon iconName="Plus" />
				</Button>
			</div>
			<TechniciansTable />
		</main>
	);
}
