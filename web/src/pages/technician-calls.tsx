import dayjs from "dayjs";
import { Text } from "@/components/text";
import { TechnicianCallCard } from "@/core-components/technician-calls";
import { useCalls } from "@/hooks/use-calls";

export function TechnicianCalls() {
	const { calls } = useCalls();

	return (
		<main className="h-screen flex-1 overflow-scroll rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<Text as="h1" variant="text-xl" className="text-blue-dark">
				Meus chamados
			</Text>
			<div className="mt-6 flex flex-col gap-6">
				<section>
					<div className="mt-4 flex w-full flex-wrap items-center gap-4">
						{calls.map(({ id, client, title, description, updatedAt }) => {
							const formattedDate = dayjs(updatedAt).format("DD/MM/YYYY HH:MM");

							return (
								<TechnicianCallCard
									id={id}
									key={id}
									name={title}
									description={description}
									date={formattedDate}
									value="200,00"
									clientName={client.name}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</main>
	);
}
