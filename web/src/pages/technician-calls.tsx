import dayjs from "dayjs";
import { StatusTag } from "@/components/status-tag";
import { Text } from "@/components/text";
import { TechnicianCallCard } from "@/core-components/technician-calls";
import { useCalls } from "@/hooks/use-calls";

function groupByStatus(calls: Call[]): Record<CallStatus, Call[]> {
	return calls.reduce(
		(acc, call) => {
			if (!acc[call.status]) {
				acc[call.status] = [];
			}
			acc[call.status].push(call);
			return acc;
		},
		{
			OPEN: [],
			IN_PROGRESS: [],
			CLOSED: [],
			LATE: [],
		} as Record<CallStatus, Call[]>,
	);
}

export function TechnicianCalls() {
	const { calls } = useCalls();

	const groupedCalls = groupByStatus(calls);

	return (
		<main className="h-screen flex-1 overflow-scroll rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none ">
			<div className="mx-auto max-w-[1440px]">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Meus chamados
				</Text>
				<div className="mt-6 flex flex-col gap-6">
					<section>
						<StatusTag variant="info" />
						<div className="mt-4 flex w-full flex-wrap items-center gap-4">
							{groupedCalls.IN_PROGRESS.length > 0 &&
								groupedCalls.IN_PROGRESS.map(
									({
										id,
										client,
										title,
										description,
										updatedAt,
										status,
										callServices,
									}) => {
										const formattedDate =
											dayjs(updatedAt).format("DD/MM/YYYY HH:MM");

										return (
											<TechnicianCallCard
												id={id}
												key={id}
												name={title}
												description={description}
												date={formattedDate}
												clientName={client.name}
												status={status}
												callServices={callServices}
											/>
										);
									},
								)}
							{groupedCalls.IN_PROGRESS.length === 0 && (
								<Text variant="text-lg">Nenhum chamado em atendimento! :(</Text>
							)}
						</div>
						<StatusTag variant="open" className="mt-8" />
						<div className="mt-4 flex w-full flex-wrap items-center gap-4">
							{groupedCalls.OPEN.length > 0 &&
								groupedCalls.OPEN.map(
									({
										id,
										client,
										title,
										description,
										updatedAt,
										status,
										callServices,
									}) => {
										const formattedDate =
											dayjs(updatedAt).format("DD/MM/YYYY HH:MM");

										return (
											<TechnicianCallCard
												id={id}
												key={id}
												name={title}
												description={description}
												date={formattedDate}
												clientName={client.name}
												status={status}
												callServices={callServices}
											/>
										);
									},
								)}

							{groupedCalls.OPEN.length === 0 && (
								<Text variant="text-lg">Nenhum chamado aberto no momento.</Text>
							)}
						</div>
						<StatusTag variant="success" className="mt-8" />
						<div className="mt-4 flex w-full flex-wrap items-center gap-4">
							{groupedCalls.CLOSED.length > 0 &&
								groupedCalls.CLOSED.map(
									({
										id,
										client,
										title,
										description,
										updatedAt,
										status,
										callServices,
									}) => {
										const formattedDate =
											dayjs(updatedAt).format("DD/MM/YYYY HH:MM");

										return (
											<TechnicianCallCard
												id={id}
												key={id}
												name={title}
												description={description}
												date={formattedDate}
												clientName={client.name}
												status={status}
												callServices={callServices}
											/>
										);
									},
								)}

							{groupedCalls.CLOSED.length === 0 && (
								<Text variant="text-lg">Nenhum chamado encerrado.</Text>
							)}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
