import { useCallback, useEffect, useState } from "react";

import { Card } from "@/components/card";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { TimeTag } from "@/components/time-tag";
import { useTechnician } from "@/hooks/use-technician";
import { toast } from "sonner";

export function AvailabilityCard() {
	const [morningHours, setMorningHours] = useState([
		{ hour: "07:00", selected: false },
		{ hour: "08:00", selected: false },
		{ hour: "09:00", selected: false },
		{ hour: "10:00", selected: false },
		{ hour: "11:00", selected: false },
		{ hour: "12:00", selected: false },
	]);

	const [afternoonHours, setAfternoonHours] = useState([
		{ hour: "13:00", selected: false },
		{ hour: "14:00", selected: false },
		{ hour: "15:00", selected: false },
		{ hour: "16:00", selected: false },
		{ hour: "17:00", selected: false },
		{ hour: "18:00", selected: false },
	]);

	const [nightHours, setNightHours] = useState([
		{ hour: "19:00", selected: false },
		{ hour: "20:00", selected: false },
		{ hour: "21:00", selected: false },
		{ hour: "22:00", selected: false },
		{ hour: "23:00", selected: false },
	]);

	const { setAvailability, errors } = useTechnician();

	function handleSelectHour(hour: string) {
		const numberHour = Number(hour.split(":")[0]);

		if (numberHour >= 7 && numberHour <= 12) {
			setMorningHours((prevState) =>
				prevState.map((morningHour) => {
					if (morningHour.hour === hour) {
						return { ...morningHour, selected: true };
					}

					return morningHour;
				}),
			);
		} else if (numberHour <= 18) {
			setAfternoonHours((prevState) =>
				prevState.map((afternoonHour) => {
					if (afternoonHour.hour === hour) {
						return { ...afternoonHour, selected: true };
					}

					return afternoonHour;
				}),
			);
		} else if (numberHour <= 23) {
			setNightHours((prevState) =>
				prevState.map((nightHour) => {
					if (nightHour.hour === hour) {
						return { ...nightHour, selected: true };
					}

					return nightHour;
				}),
			);
		} else {
			toast.error("Horário inválido!");
		}
	}

	function handleUnselectHour(hour: string) {
		const numberHour = Number(hour.split(":")[0]);

		if (numberHour >= 7 && numberHour <= 12) {
			setMorningHours((prevState) =>
				prevState.map((morningHour) => {
					if (morningHour.hour === hour) {
						return { ...morningHour, selected: false };
					}

					return morningHour;
				}),
			);
		} else if (numberHour <= 18) {
			setAfternoonHours((prevState) =>
				prevState.map((afternoonHour) => {
					if (afternoonHour.hour === hour) {
						return { ...afternoonHour, selected: false };
					}

					return afternoonHour;
				}),
			);
		} else if (numberHour <= 23) {
			setNightHours((prevState) =>
				prevState.map((nightHour) => {
					if (nightHour.hour === hour) {
						return { ...nightHour, selected: false };
					}

					return nightHour;
				}),
			);
		} else {
			toast.error("Horário inválido!");
		}
	}

	const handleUpdateAvailabilityHours = useCallback(() => {
		const availabilityHours: string[] = [];

		morningHours.forEach((hour) => {
			if (hour.selected === true) {
				availabilityHours.push(hour.hour);
			}
		});

		afternoonHours.forEach((hour) => {
			if (hour.selected === true) {
				availabilityHours.push(hour.hour);
			}
		});

		nightHours.forEach((hour) => {
			if (hour.selected === true) {
				availabilityHours.push(hour.hour);
			}
		});

		setAvailability(availabilityHours);
	}, [morningHours, afternoonHours, nightHours, setAvailability]);

	useEffect(() => {
		handleUpdateAvailabilityHours();
	}, [handleUpdateAvailabilityHours]);

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
					<div className="flex items-center gap-2 flex-wrap mt-2">
						{morningHours.map(({ hour, selected }) => (
							<TimeTag
								key={hour}
								selected={selected}
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
					<div className="flex items-center gap-2 flex-wrap mt-2">
						{afternoonHours.map(({ hour, selected }) => (
							<TimeTag
								key={hour}
								selected={selected}
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
					<div className="flex items-center gap-2 flex-wrap mt-2">
						{nightHours.map(({ hour, selected }) => (
							<TimeTag
								key={hour}
								selected={selected}
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
				<div className="flex items-center gap-1 mt-2 text-feedback-danger">
					<Icon size="md" iconName="CircleAlert" />
					<Text variant="text-xs">{errors.availability}</Text>
				</div>
			)}
		</Card>
	);
}
