import { Text } from "@/components/text";
import { CallsTable } from "@/core-components/calls/calls-table";

export function Calls() {
	return (
		<main className="h-screen flex-1 rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<Text as="h1" variant="text-xl" className="mb-6 text-blue-dark">
				Chamados
			</Text>
			<CallsTable />
		</main>
	);
}
