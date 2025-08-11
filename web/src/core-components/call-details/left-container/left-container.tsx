import { useAuth } from "@/hooks/use-auth";
import { AdditionalCard } from "../additional-card/additional-card";
import { CallCard } from "../call-card";

export function LeftContainer() {
	const { session } = useAuth();

	return (
		<div className="flex w-full flex-col gap-3 md:w-4/7">
			<CallCard />
			{session?.user.role === "TECHNICIAN" && <AdditionalCard />}
		</div>
	);
}
