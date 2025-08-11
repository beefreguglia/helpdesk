import { Text } from "@/components/text";
import { ServiceCreateDialogButton } from "@/core-components/services/service-create-dialog-button";
import { ServicesTable } from "@/core-components/services/services-table/services-table";

export function Services() {
	return (
		<main className="h-screen flex-1 rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<div className="mb-6 flex w-full items-center justify-between gap-4">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Serviços
				</Text>
				<ServiceCreateDialogButton />
			</div>
			<ServicesTable />
		</main>
	);
}
