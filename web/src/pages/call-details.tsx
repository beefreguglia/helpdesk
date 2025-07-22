import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "@/components/container";
import { Loading } from "@/components/loading";
import {
	AdditionalCard,
	CallCard,
	Header,
	LeftContainer,
	TechnicianCard,
} from "@/core-components/call-details";
import { useAuth } from "@/hooks/use-auth";
import { useCall } from "@/hooks/use-call";

export function CallDetails() {
	const { id } = useParams<{ id?: string }>();
	const { getCall, isCallLoading } = useCall();
	const { session } = useAuth();

	const [call, setCall] = useState<CallDetails | null>(null);

	useEffect(() => {
		if (!id) {
			return;
		}

		const fetchCall = async () => {
			const result = await getCall(id);
			if (result) setCall(result);
		};

		fetchCall();
	}, [id, getCall]);

	return (
		<main className="h-screen flex-1 overflow-auto rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<Container>
				<Header />

				<div className="flex flex-col gap-4 md:hidden">
					{call && !isCallLoading ? (
						<>
							<CallCard
								id={call.id}
								createdAt={call.createdAt}
								description={call.description}
								status={call.status}
								title={call.title}
								updatedAt={call.updatedAt}
								clientName={call.clientName}
							/>
							<TechnicianCard
								technicianEmail={call.technicianEmail}
								technicianName={call.technicianName}
								services={call.services}
							/>
							{session?.user.role === "TECHNICIAN" && (
								<AdditionalCard services={call.services} />
							)}
						</>
					) : (
						<Loading />
					)}
				</div>

				<div className="hidden md:flex md:flex-row md:gap-6">
					{call && !isCallLoading ? (
						<>
							<LeftContainer
								id={call.id}
								createdAt={call.createdAt}
								description={call.description}
								status={call.status}
								title={call.title}
								updatedAt={call.updatedAt}
								clientName={call.clientName}
								services={call.services}
							/>
							<TechnicianCard
								technicianEmail={call.technicianEmail}
								technicianName={call.technicianName}
								services={call.services}
							/>
						</>
					) : (
						<Loading />
					)}
				</div>
			</Container>
		</main>
	);
}
