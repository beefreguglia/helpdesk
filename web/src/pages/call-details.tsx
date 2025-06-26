import { Container } from "@/components/container";
import {
	AdditionalCard,
	CallCard,
	Header,
	LeftContainer,
	TechnicianCard,
} from "@/core-components/call-details";

export function CallDetails() {
	return (
		<main className="bg-gray-600 h-screen flex-1 rounded-t-md md:rounded-tr-none pt-7 px-6 pb-6 overflow-auto">
			<Container>
				<Header />

				<div className="flex flex-col gap-4 md:hidden">
					<CallCard />
					<TechnicianCard />
					<AdditionalCard />
				</div>

				<div className="hidden md:flex md:flex-row md:gap-6">
					<LeftContainer />
					<TechnicianCard />
				</div>
			</Container>
		</main>
	);
}
