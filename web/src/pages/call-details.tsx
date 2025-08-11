import { useEffect } from "react";
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
	const { getCall, isCallLoading, call } = useCall();
	const { session } = useAuth();

	useEffect(() => {
		if (!id) {
			return;
		}
		getCall(id);
	}, [id, getCall]);

	return (
		<main className="h-screen flex-1 overflow-auto rounded-t-md bg-gray-600 px-6 pt-7 pb-6 md:rounded-tr-none">
			<Container>
				{call && !isCallLoading && <Header />}

				<div className="flex flex-col gap-4 md:hidden">
					{call && !isCallLoading ? (
						<>
							<CallCard />
							<TechnicianCard />
							{session?.user.role === "TECHNICIAN" && <AdditionalCard />}
						</>
					) : (
						<Loading />
					)}
				</div>

				<div className="hidden md:flex md:flex-row md:gap-6">
					{call && !isCallLoading ? (
						<>
							<LeftContainer />
							<TechnicianCard />
						</>
					) : (
						<Loading />
					)}
				</div>
			</Container>
		</main>
	);
}
