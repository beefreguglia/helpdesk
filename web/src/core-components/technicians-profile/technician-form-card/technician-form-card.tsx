import { useTechnician } from "@/hooks/use-technician";
import { useLocation } from "react-router";

import { Avatar } from "@/components/avatar";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Text } from "@/components/text";

export function TechnicianFormCard() {
	const location = useLocation();
	const isEditing = location.pathname.includes("/edit");
	const { email, setEmail, name, setName, password, setPassword, errors } =
		useTechnician();

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
					<Avatar name="Técnico teste" size="lg" className="my-5 md:my-6" />
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
