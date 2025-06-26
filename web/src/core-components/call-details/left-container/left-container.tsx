import { AdditionalCard } from "../additional-card/additional-card";
import { CallCard } from "../call-card";

export function LeftContainer() {
	return (
		<div className="flex flex-col gap-3 w-full md:w-4/7">
			<CallCard />
			<AdditionalCard />
		</div>
	);
}
