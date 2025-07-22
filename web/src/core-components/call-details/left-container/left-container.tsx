import { useAuth } from "@/hooks/use-auth";
import { AdditionalCard } from "../additional-card/additional-card";
import { CallCard } from "../call-card";

type LeftContainerProps = {
	id: string;
	title: string;
	description: string;
	clientName: string;
	status: CallStatus;
	createdAt: Date;
	updatedAt: Date;
	services: { title: string; price: number }[];
};

export function LeftContainer({
	id,
	clientName,
	createdAt,
	description,
	status,
	title,
	updatedAt,
	services,
}: LeftContainerProps) {
	const { session } = useAuth();

	return (
		<div className="flex w-full flex-col gap-3 md:w-4/7">
			<CallCard
				id={id}
				createdAt={createdAt}
				description={description}
				status={status}
				title={title}
				updatedAt={updatedAt}
				clientName={clientName}
			/>
			{session?.user.role === "TECHNICIAN" && (
				<AdditionalCard services={services} />
			)}
		</div>
	);
}
