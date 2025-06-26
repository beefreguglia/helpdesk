import { StatusTag } from "@/components/status-tag";
import { Text } from "@/components/text";
import { TechnicianCallCard } from "@/core-components/technician-calls";

export function TechnicianCalls() {
	return (
		<main className="bg-gray-600 h-screen flex-1 rounded-t-md md:rounded-tr-none pt-7 px-6 pb-6 overflow-scroll">
			<Text as="h1" variant="text-xl" className="text-blue-dark">
				Meus chamados
			</Text>
			<div className="mt-6 flex flex-col gap-6">
				<section>
					<StatusTag variant="info" />
					<div className="flex items-center gap-4 w-full flex-wrap mt-4">
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
						<TechnicianCallCard
							id="00004"
							name="Teste"
							description="Teste"
							date="10/04/25 15:13"
							value="200,00"
							clientName="Teste"
						/>
					</div>
				</section>
			</div>
		</main>
	);
}
