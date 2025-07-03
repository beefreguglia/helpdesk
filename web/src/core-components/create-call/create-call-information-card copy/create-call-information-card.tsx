import { Card } from "@/components/card";
import { CreateCallForm } from "./create-call-form";
import { CreateCallInformationHeader } from "./create-call-information-header";

export function CreateCallInformationCard() {
	return (
		<Card size="md" className="flex flex-col gap-3 w-full md:w-4/7">
			<CreateCallInformationHeader />
			<CreateCallForm />
		</Card>
	);
}
