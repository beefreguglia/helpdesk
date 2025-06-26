import { Loader2 } from "lucide-react";

export function Loading() {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="relative">
				<Loader2 size={64} className="text-blue-light animate-spin" />
				<div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-blue-dark animate-[spin_3s_linear_infinite]" />
			</div>
		</div>
	);
}
