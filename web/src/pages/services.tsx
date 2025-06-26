import { Text } from "@/components/text";
import { ServiceCreateDialogButton } from "@/core-components/services/service-create-dialog-button";
import { ServicesTable } from "@/core-components/services/services-table/services-table";

export function Services() {
	return (
		<main className="bg-gray-600 h-screen flex-1 rounded-t-md md:rounded-tr-none pt-7 px-6 pb-6">
			<div className="flex w-full items-center gap-4 justify-between mb-6">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Serviços
				</Text>
				<ServiceCreateDialogButton />
			</div>
			<ServicesTable />
		</main>
	);
}
