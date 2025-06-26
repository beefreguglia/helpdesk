import { Text } from "@/components/text";
import { CallsTable } from "@/core-components/calls/calls-table";

export function AdminCalls() {
	return (
		<main className="bg-gray-600 h-screen flex-1 rounded-t-md md:rounded-tr-none pt-7 px-6 pb-6">
			<Text as="h1" variant="text-xl" className="text-blue-dark mb-6">
				Chamados
			</Text>
			<CallsTable />
		</main>
	);
}
