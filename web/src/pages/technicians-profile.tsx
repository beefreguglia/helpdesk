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
			<main className="bg-gray-600 h-screen flex-1 rounded-t-md md:rounded-tr-none pt-7 px-6 pb-6 overflow-auto">
				<Container>
					<Header />
					<div className="flex flex-col gap-4 md:gap-6 md:flex-row">
						<TechnicianFormCard />
						<AvailabilityCard />
					</div>
				</Container>
			</main>
		</TechnicianProvider>
	);
}
