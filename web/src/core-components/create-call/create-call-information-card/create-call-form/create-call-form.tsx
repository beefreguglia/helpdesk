import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { TextArea } from "@/components/textarea";
import { useServicesActive } from "@/hooks/use-service-active";
import { api } from "@/services/api";

const createCallSchema = z.object({
	title: z.string().min(1, "Título é obrigatório"),
	description: z.string().min(1, "Descrição é obrigatória"),
});

type CreateCallFormInputs = z.infer<typeof createCallSchema>;

type CreateCallFormProps = {
	handleSelectService: (service: Service) => void;
	selectedService?: Service | null;
	handleSubmit: () => void;
	handleFinish: () => void;
};

export function CreateCallForm({
	handleSelectService,
	selectedService,
	handleFinish,
	handleSubmit: handleLoadingSubmit,
}: CreateCallFormProps) {
	const { services, isLoadingServices } = useServicesActive();

	function handleSelect(serviceId: string) {
		const foundService = services.find((service) => service.id === serviceId);

		if (foundService) {
			handleSelectService(foundService);
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<CreateCallFormInputs>({
		resolver: zodResolver(createCallSchema),
	});

	const navigate = useNavigate();
	const onSubmit = async (data: CreateCallFormInputs) => {
		handleLoadingSubmit();
		try {
			await api.post("/calls", {
				title: data.title,
				description: data.description,
				serviceId: selectedService?.id,
			});

			toast.success("Chamado criado com sucesso!");
			navigate("/");
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError) {
				const errorMessage =
					error.response?.data.message || "Erro ao criar novo chamado.";
				setError("root.serverError", {
					type: "server",
					message: errorMessage,
				});
			} else {
				setError("root.serverError", {
					type: "server",
					message: "Não foi possível criar um novo chamado!",
				});
			}
		} finally {
			handleFinish();
		}
	};

	useEffect(() => {
		if (errors.root?.serverError) {
			toast.error(errors.root.serverError.message);
		}
	}, [errors.root?.serverError]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
			id="call-form"
		>
			<Input
				id="title"
				legend="Título"
				placeholder="Digite..."
				required
				{...register("title")}
				errorText={errors.title?.message}
			/>
			<TextArea
				id="description"
				legend="Descrição"
				placeholder="Digite..."
				required
				className="h-40 max-h-80 min-h-20 resize-y"
				{...register("description")}
				errorText={errors.description?.message}
			/>
			<Select
				placeholder="Selecione a categoria de atendimento"
				legend="Categoria de serviço"
				disabled={isLoadingServices}
				onChange={(e) => handleSelect(e.target.value)}
				required
				id="category"
			>
				{services.map((service) => (
					<option key={service.id} value={service.id}>
						{service.title}
					</option>
				))}
			</Select>
		</form>
	);
}
