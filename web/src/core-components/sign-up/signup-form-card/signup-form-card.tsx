import { z } from "zod";
import { toast } from 'sonner';
import { useState } from "react";
import { ZodError } from "zod/v4";

import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { api } from "../../../services/api";
import { Text } from "../../../components/text";
import { Card } from "../../../components/card";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";

 const signUpSchema = z
    .object({
      name: z.string().trim().min(1, "Informe o nome"),
      email: z.string().email({ message: "E-mail inválido" }),
      password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos"),
    })


export function SignupFormCard() {
	const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = signUpSchema.parse({
        name,
        email,
        password,
      });

      await api.post("/users", data);

			toast.success("Cadastro realizado com sucesso! Faça login para continuar.");

			navigate("/");
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return toast.error(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }

      toast.error("Não foi possível finalizar o cadastro!");
    } finally {
      setIsLoading(false);
    }
  }

	return (
		<Card size="md" className="w-full mt-6 mb-3 md:mt-10 flex flex-col gap-10">
			<div className="flex flex-col gap-0.5">
				<Text variant="text-lg" as="h1">
					Crie sua conta
				</Text>
				<Text as="span" variant="text-xs" className="text-gray-300">
					Informe seu nome, e-mail e senha
				</Text>
			</div>
			<form id="signup-form" className=" flex flex-col gap-4" onSubmit={onSubmit}>
				<Input
					id="name"
					name="name"
					legend="Nome"
					placeholder="Digite o nome completo"
					required
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					id="email"
					name="email"
					legend="E-mail"
					placeholder="exemplo@email.com"
					type="email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					id="password"
					name="password"
					legend="Senha"
					placeholder="Digite sua senha"
					type="password"
					required
					helpText="Mínimo 6 dígitos"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</form>
			<Button type="submit" isLoading={isLoading} form="signup-form">Cadastrar</Button>
		</Card>
	);
}
