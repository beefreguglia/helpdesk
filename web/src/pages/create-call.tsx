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
		<main className="bg-gray-600 h-screen flex-1 flex justify-center rounded-t-md md:rounded-tr-none pt-7 px-6 b-6 overflow-y-auto">
			<div className="md:max-w-[1140px] flex flex-col w-full">
				<Text as="h1" variant="text-xl" className="text-blue-dark mb-6">
					Novo Chamado
				</Text>
				<div className="flex flex-col md:flex-row gap-4 md:gap-6 pb-6">
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
