import { Container } from "@/components/container";
import { TechnicianProvider } from "@/context/technician-context";
import {
	AvailabilityCard,
	Header,
	TechnicianFormCard,
} from "@/core-components/technicians-profile";

export function TechniciansProfile() {
	return (
		<TechnicianProvider>
			<main className="h-screen flex-1 overflow-auto rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
				<Container>
					<Header />
					<div className="flex flex-col gap-4 md:flex-row md:gap-6">
						<TechnicianFormCard />
						<AvailabilityCard />
					</div>
				</Container>
			</main>
		</TechnicianProvider>
	);
}
