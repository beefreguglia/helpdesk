import { useState } from "react";

import { Text } from "@/components/text";
import { CreateCallInformationCard } from "@/core-components/create-call/create-call-information-card";
import { CreateCallResumeCard } from "@/core-components/create-call/create-call-resume-card";

export function CreateCall() {
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleSelectService(service: Service) {
		setSelectedService(service);
	}

	function handleSubmit() {
		setIsSubmitting(true);
	}

	function handleFinish() {
		setIsSubmitting(false);
	}

	return (
		<main className="b-6 flex h-screen flex-1 justify-center overflow-y-auto rounded-t-md bg-gray-600 px-6 pt-7 md:rounded-tr-none">
			<div className="flex w-full flex-col md:max-w-[1140px]">
				<Text as="h1" variant="text-xl" className="mb-6 text-blue-dark">
					Novo Chamado
				</Text>
				<div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6">
					<CreateCallInformationCard
						handleSubmit={handleSubmit}
						handleFinish={handleFinish}
						handleSelectService={handleSelectService}
						selectedService={selectedService}
					/>
					<CreateCallResumeCard
						selectedService={selectedService}
						isSubmitting={isSubmitting}
					/>
				</div>
			</div>
		</main>
	);
}
