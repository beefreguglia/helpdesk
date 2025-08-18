import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { useTechnician } from "@/hooks/use-technician";

export function TechnicianFormCard() {
	const location = useLocation();
	const isEditing = location.pathname.includes("/edit");
	const { id } = useParams<{ id?: string }>();

	const [hasFetchedForId, setHasFetchedForId] = useState<string | null>(null);

	const {
		email,
		setEmail,
		name,
		setName,
		password,
		setPassword,
		errors,
		getTechnician,
		clearErrors,
		isLoading,
		error,
		imageName,
	} = useTechnician();

	const handleLoadTechnician = useCallback(
		async (technicianId: string) => {
			if (hasFetchedForId !== technicianId) {
				setHasFetchedForId(technicianId);
				await getTechnician(technicianId);
			}
		},
		[getTechnician, hasFetchedForId],
	);

	useEffect(() => {
		if (!isEditing) {
			setName("");
			setEmail("");
			setPassword("");
			clearErrors();
		}
	}, [isEditing]);

	useEffect(() => {
		if (isEditing && id) {
			handleLoadTechnician(id);
		}
	}, [isEditing, id, handleLoadTechnician]);

	if (isLoading && hasFetchedForId === id) {
		return (
			<Card
				size="md"
				className="flex min-h-[200px] w-full items-center justify-center md:w-2/5"
			>
				<Text variant="text-md-bold">Carregando informações do técnico...</Text>
			</Card>
		);
	}

	if (error && hasFetchedForId === id) {
		return (
			<Card
				size="md"
				className="flex min-h-[200px] w-full flex-col items-center justify-center md:w-2/5"
			>
				<Text variant="text-sm" className="text-red-500">
					Erro ao carregar dados: {error}
				</Text>
				{id && (
					<Button
						onClick={() => {
							setHasFetchedForId(null);
							handleLoadTechnician(id);
						}}
						className="mt-4"
					>
						Tentar novamente
					</Button>
				)}
			</Card>
		);
	}

	return (
		<Card size="md" className="w-full md:w-2/5">
			<Text as="h2" variant="text-md-bold">
				Dados pessoais
			</Text>
			<Text variant="text-xs" className="text-gray-300">
				Defina as informações do perfil de técnico
			</Text>
			<form className="mt-6 flex flex-col gap-4">
				{isEditing && (
					<Avatar fileName={imageName} name={name || "Técnico"} size="lg" />
				)}
				<Input
					legend="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
					errorText={errors.name}
				/>
				<Input
					legend="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					errorText={errors.email}
				/>
				{!isEditing && (
					<Input
						legend="Senha"
						helpText="Mínimo de 6 dígitos"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						errorText={errors.password}
					/>
				)}
			</form>
		</Card>
	);
}
