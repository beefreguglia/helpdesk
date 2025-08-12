import { Card } from "@/components/card";
import { CreateCallForm } from "./create-call-form";
import { CreateCallInformationHeader } from "./create-call-information-header";

type CreateCallInformationCardProps = {
	handleSelectService: (service: Service) => void;
	selectedService: Service | null;
	handleSubmit: () => void;
	handleFinish: () => void;
};

export function CreateCallInformationCard({
	handleSelectService,
	selectedService,
	handleFinish,
	handleSubmit,
}: CreateCallInformationCardProps) {
	return (
		<Card size="md" className="flex w-full flex-col gap-3 md:w-4/7">
			<CreateCallInformationHeader />
			<CreateCallForm
				handleSelectService={handleSelectService}
				selectedService={selectedService}
				handleFinish={handleFinish}
				handleSubmit={handleSubmit}
			/>
		</Card>
	);
}
