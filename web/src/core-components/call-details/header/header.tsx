import { useParams } from "react-router";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";
import { useCall } from "@/hooks/use-call";

type Params = {
	id: string;
};

export function Header() {
	const { session } = useAuth();
	const { id } = useParams<Params>();
	const { finishCall, call, startCall } = useCall();

	async function handleFinishCall() {
		if (id) {
			await finishCall(id);
		}
	}

	async function handleStartCall() {
		if (id) {
			await startCall(id);
		}
	}

	const { status } = call!;

	return (
		<header>
			<BackButton />
			<div className="mb-6 flex w-full flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4">
				<Text as="h1" variant="text-xl" className="text-blue-dark">
					Chamado detalhado
				</Text>
				{session?.user.role === "TECHNICIAN" && (
					<div className="flex items-center gap-2">
						<Button
							variant="secondary"
							disabled={status === "CLOSED"}
							onClick={handleFinishCall}
							className="flex w-full items-center gap-2 md:w-auto md:shrink-0"
						>
							<Icon iconName="CircleCheckBig" />
							<Text variant="text-sm-bold" className="shrink-0">
								Encerrar
							</Text>
						</Button>
						<Button
							disabled={status === "IN_PROGRESS"}
							className="flex w-full items-center gap-2 md:w-auto md:shrink-0"
							onClick={handleStartCall}
						>
							<Icon iconName="Clock" className="text-gray-600" />
							<Text variant="text-sm-bold">Iniciar atendimento</Text>
						</Button>
					</div>
				)}
				{session?.user.role === "ADMIN" && (
					<div className="flex items-center gap-2">
						<Button
							variant="secondary"
							disabled={status === "IN_PROGRESS"}
							className="flex w-full items-center gap-2 md:w-auto md:shrink-0"
							onClick={handleStartCall}
						>
							<Icon size="lg" iconName="Clock" className="text-gray-300" />
							<Text variant="text-sm-bold" className="shrink-0">
								Em atendimento
							</Text>
						</Button>
						<Button
							variant="secondary"
							type="button"
							disabled={status === "CLOSED"}
							className="flex w-full items-center gap-2 md:w-auto md:shrink-0"
							onClick={() => handleFinishCall()}
						>
							<Icon iconName="CheckCircle" className="text-gray-300" />
							<Text variant="text-sm-bold">Encerrado</Text>
						</Button>
					</div>
				)}
			</div>
		</header>
	);
}
