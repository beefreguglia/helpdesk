import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import { Input } from "../../../components/input";
import { Text } from "../../../components/text";
import { useAuth } from "../../../hooks/use-auth";
import { api } from "../../../services/api";

const signInSchema = z.object({
	email: z.string().email({ message: "E-mail inválido" }),
	password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos"),
});

type SignInFormInputs = z.infer<typeof signInSchema>;

export function SignInFormCard() {
	const { save } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignInFormInputs>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInFormInputs) => {
		try {
			const { data: responseData } = await api.post("/sessions", data);
			save(responseData);
			toast.success("Login realizado com sucesso!");
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError) {
				const errorMessage =
					error.response?.data.message || "Credenciais inválidas.";
				setError("root.serverError", {
					type: "server",
					message: errorMessage,
				});
			} else {
				setError("root.serverError", {
					type: "server",
					message: "Não foi possível entrar no sistema!",
				});
			}
		}
	};

	useEffect(() => {
		if (errors.root?.serverError) {
			toast.error(errors.root.serverError.message);
		}
	}, [errors.root?.serverError]);

	return (
		<Card size="md" className="mt-6 mb-3 flex w-full flex-col gap-10 md:mt-10">
			<div className="flex flex-col gap-0.5">
				<Text variant="text-lg" as="h1">
					Acesse o portal
				</Text>
				<Text as="span" variant="text-xs" className="text-gray-300">
					Entre usando seu e-mail e senha cadastrados
				</Text>
			</div>
			<form
				id="sign-in-form"
				className=" flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					id="email"
					legend="E-mail"
					placeholder="exemplo@email.com"
					type="email"
					required
					{...register("email")}
					errorText={errors.email?.message}
				/>
				<Input
					id="password"
					legend="Senha"
					placeholder="Digite sua senha"
					type="password"
					required
					{...register("password")}
					errorText={errors.password?.message}
				/>
			</form>
			<Button isLoading={isSubmitting} type="submit" form="sign-in-form">
				Entrar
			</Button>
		</Card>
	);
}
