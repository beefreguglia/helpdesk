import { Text } from "@/components/text";
import { ClientsTable } from "@/core-components/clients/clients-table/clients-table";

export function Clients() {
	return (
		<main className="h-screen flex-1 rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<Text as="h1" variant="text-xl" className="text-blue-dark">
				Clientes
			</Text>

			<ClientsTable />
		</main>
	);
}
