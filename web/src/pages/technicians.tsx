import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { TechniciansTable } from "@/core-components/technicians/technicians-table/technicians-table";

export function Technicians() {
	return (
		<main className="bg-gray-600 h-screen flex-1 rounded-t-md md:rounded-tr-none pt-7 px-6 pb-6">
			<div className="flex w-full items-center gap-4 justify-between mb-6">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Técnicos
				</Text>
				<Button
					as="a"
					href="/technicians-profile"
					className="hidden md:flex items-center gap-2"
				>
					<Icon iconName="Plus" />
					<Text variant="text-sm">Novo</Text>
				</Button>
				<Button
					as="a"
					href="/technicians-profile"
					size="icon-md"
					className="flex md:hidden items-center gap-2"
				>
					<Icon iconName="Plus" />
				</Button>
			</div>
			<TechniciansTable />
		</main>
	);
}
