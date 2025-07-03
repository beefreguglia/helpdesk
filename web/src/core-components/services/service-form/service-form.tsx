import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useService } from "@/hooks/use-service";
import { toast } from "sonner";

function parseCurrency(value: string): number {
	if (!value) return Number.NaN;
	const numericString = value.replace(/\D/g, "");
	if (numericString === "") return Number.NaN;
	return Number(numericString) / 100;
}

function formatCurrency(value: string): string {
	const numeric = value.replace(/\D/g, "");
	if (!numeric) return "";
	const parsed = (Number(numeric) / 100).toFixed(2);
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(Number(parsed));
}

function formatCurrencyFromNumber(value: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}

const createServiceSchema = z.object({
	title: z.string().min(1, "Digite o título do serviço"),
	price: z
		.string()
		.min(1, "Digite o valor do serviço")
		.refine((val) => !Number.isNaN(parseCurrency(val)), {
			message: "Valor inválido",
		}),
});

type CreateServiceFormInputs = z.infer<typeof createServiceSchema>;

type ServiceFormProps = {
	handleClose: () => void;
	isUpdatingService?: boolean;
	serviceId?: string;
};

export function ServiceForm({
	isUpdatingService = false,
	handleClose,
	serviceId,
}: ServiceFormProps) {
	const { createService, updateService, getService } = useService();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		setValue,
		reset,
	} = useForm<CreateServiceFormInputs>({
		resolver: zodResolver(createServiceSchema),
		defaultValues: {
			title: "",
			price: "",
		},
	});

	const [priceInput, setPriceInput] = useState("");

	const handleReset = useCallback(() => {
		setPriceInput("");
		reset();
	}, [reset]);

	const onSubmit = useCallback(
		async (data: CreateServiceFormInputs) => {
			if (isUpdatingService) {
				if (serviceId) {
					await updateService(
						serviceId,
						data.title,
						data.price,
						handleClose,
						handleReset,
						setError,
					);
				} else {
					toast.error("Serviço não encontrado! Tente novamente mais tarde.");
				}
			} else {
				await createService(
					data.title,
					data.price,
					handleClose,
					handleReset,
					setError,
				);
			}
		},
		[
			isUpdatingService,
			serviceId,
			updateService,
			createService,
			handleClose,
			handleReset,
			setError,
		],
	);

	const handlePriceChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value;
			const formatted = formatCurrency(rawValue);
			setPriceInput(formatted);
			setValue("price", formatted, { shouldValidate: true });
		},
		[setValue],
	);

	const loadService = useCallback(async () => {
		if (isUpdatingService && serviceId) {
			const serviceData = await getService(serviceId);
			if (serviceData) {
				setValue("title", serviceData.title);
				const formattedPrice = formatCurrencyFromNumber(serviceData.price);
				setPriceInput(formattedPrice);
				setValue("price", formattedPrice);
			}
		}
	}, [isUpdatingService, serviceId, getService, setValue]);

	useEffect(() => {
		loadService();
	}, [loadService]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-6 border-y border-gray-500 flex flex-col gap-4"
		>
			<Input
				legend="Título"
				id="title"
				placeholder="Digite..."
				{...register("title")}
				errorText={errors.title?.message}
			/>

			<Input
				legend="Valor"
				id="price"
				value={priceInput}
				onChange={handlePriceChange}
				errorText={errors.price?.message}
				placeholder="R$ 0,00"
			/>

			<footer className="mt-4">
				{isUpdatingService ? (
					<Button type="submit" isLoading={isSubmitting} className="w-full">
						{isSubmitting ? "Enviando..." : "Atualizar Serviço"}
					</Button>
				) : (
					<Button type="submit" isLoading={isSubmitting} className="w-full">
						{isSubmitting ? "Enviando..." : "Criar Serviço"}
					</Button>
				)}
			</footer>
		</form>
	);
}
