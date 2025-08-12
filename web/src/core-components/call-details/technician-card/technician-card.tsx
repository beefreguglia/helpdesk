import { Avatar } from "@/components/avatar";
import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { useCall } from "@/hooks/use-call";
import { formatCurrencyToBRL } from "@/utils/format-to-currency";

export function TechnicianCard() {
	const { call } = useCall();
	const { services, technicianName, technicianEmail } = call!;
	const [initialService, ...additionalServices] = services;

	const total = services.reduce(
		(sum, item) => sum + (Number(item?.price) || 0),
		0,
	);

	return (
		<Card size="md" className="h-fit w-full md:w-3/7">
			<div className="flex flex-col gap-2">
				<Text as="label" variant="text-xs-bold" className="text-gray-400">
					Técnico responsável
				</Text>
				<div className="flex items-center gap-2">
					<Avatar name={technicianName} />
					<div className="flex flex-col">
						<Text variant="text-sm">{technicianName}</Text>
						<Text variant="text-xs" className="text-gray-300">
							{technicianEmail}
						</Text>
					</div>
				</div>
			</div>
			<div className="mt-8 flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Text as="label" variant="text-xs-bold" className="text-gray-400">
						Valores
					</Text>
					<div className="flex w-full items-center justify-between">
						<Text variant="text-xs">Preço base</Text>
						<Text variant="text-xs">
							{formatCurrencyToBRL(initialService.price)}
						</Text>
					</div>
				</div>
				<div className="mt-8 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						{additionalServices.length > 0 && (
							<>
								<Text
									as="label"
									variant="text-xs-bold"
									className="text-gray-400"
								>
									Adicionais
								</Text>
								{additionalServices.map((additionalService, i) => (
									<div
										key={`${additionalService.title}-${i}`}
										className="flex w-full items-center justify-between"
									>
										<Text variant="text-xs">{additionalService.title}</Text>
										<Text variant="text-xs">
											{formatCurrencyToBRL(additionalService.price)}
										</Text>
									</div>
								))}
							</>
						)}
						<div className="mt-8 flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<div className="flex w-full items-center justify-between border-gray-500 border-t">
									<Text variant="text-sm-bold" className="mt-3 text-gray-300">
										Total
									</Text>
									<Text variant="text-sm-bold" className="text-gray-300">
										{formatCurrencyToBRL(total)}
									</Text>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
