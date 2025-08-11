import { Card } from "@/components/card";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { TimeTag } from "@/components/time-tag";
import { useTechnician } from "@/hooks/use-technician";

const MORNING_HOURS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
const AFTERNOON_HOURS = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const NIGHT_HOURS = ["19:00", "20:00", "21:00", "22:00", "23:00"];

export function AvailabilityCard() {
	const { availability, setAvailability, errors } = useTechnician();

	const handleSelectHour = (hourToAdd: string) => {
		setAvailability((currentHours) => {
			if (currentHours.includes(hourToAdd)) {
				return currentHours;
			}

			return [...currentHours, hourToAdd].sort();
		});
	};

	const handleUnselectHour = (hourToRemove: string) => {
		setAvailability((currentHours) =>
			currentHours?.filter((h) => h !== hourToRemove),
		);
	};

	return (
		<Card size="md" className="w-full md:w-3/5">
			<Text as="h2" variant="text-md-bold">
				Horários de atendimento
			</Text>
			<Text variant="text-xs" className="text-gray-300">
				Selecione os horários de disponibilidade do técnico para atendimento
			</Text>
			<div className="mt-5 flex flex-col gap-4">
				<div>
					<Text variant="text-xxs">Manhã</Text>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						{MORNING_HOURS.map((hour) => (
							<TimeTag
								key={hour}
								selected={availability.includes(hour)}
								handleSelectTag={() => handleSelectHour(hour)}
								handleRemoveTag={() => handleUnselectHour(hour)}
							>
								{hour}
							</TimeTag>
						))}
					</div>
				</div>
				<div>
					<Text variant="text-xxs">Tarde</Text>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						{AFTERNOON_HOURS.map((hour) => (
							<TimeTag
								key={hour}
								selected={availability.includes(hour)}
								handleSelectTag={() => handleSelectHour(hour)}
								handleRemoveTag={() => handleUnselectHour(hour)}
							>
								{hour}
							</TimeTag>
						))}
					</div>
				</div>
				<div>
					<Text variant="text-xxs">Noite</Text>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						{NIGHT_HOURS.map((hour) => (
							<TimeTag
								key={hour}
								selected={availability.includes(hour)}
								handleSelectTag={() => handleSelectHour(hour)}
								handleRemoveTag={() => handleUnselectHour(hour)}
							>
								{hour}
							</TimeTag>
						))}
					</div>
				</div>
			</div>
			{errors.availability && (
				<div className="mt-2 flex items-center gap-1 text-feedback-danger">
					<Icon size="md" iconName="CircleAlert" />
					<Text variant="text-xs">{errors.availability}</Text>
				</div>
			)}
		</Card>
	);
}
