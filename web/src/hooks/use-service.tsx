import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import { api } from "@/services/api";

function parseCurrency(value: string): number {
	if (!value) return Number.NaN;
	const numericString = value.replace(/\D/g, "");
	if (numericString === "") return Number.NaN;
	return Number(numericString) / 100;
}

interface Service {
	id: string;
	title: string;
	price: number;
}

export function useService() {
	const [isLoading, setIsLoading] = useState(false);
	const [isServiceLoading, setIsServiceLoading] = useState(false);

	const queryClient = useQueryClient();

	const createService = useCallback(
		async (
			title: string,
			price: string,
			handleClose: () => void,
			reset: () => void,
			setError: UseFormSetError<{
				title: string;
				price: string;
			}>,
		) => {
			try {
				await api.post("/services", {
					title: title,
					price: parseCurrency(price),
				});
				queryClient.invalidateQueries({ queryKey: ["", "services"] });
				toast.success("Serviço criado com sucesso!");
				handleClose();
				reset();
			} catch (error) {
				console.error(error);
				if (error instanceof AxiosError) {
					const errorMessage =
						error.response?.data.message || "Erro inesperado ao criar serviço.";
					setError("root.serverError", {
						type: "server",
						message: errorMessage,
					});
				} else {
					setError("root.serverError", {
						type: "server",
						message: "Erro inesperado ao criar serviço!",
					});
				}
			}
		},
		[queryClient],
	);

	const updateService = useCallback(
		async (
			id: string,
			title: string,
			price: string,
			handleClose: () => void,
			reset: () => void,
			setError: UseFormSetError<{
				title: string;
				price: string;
			}>,
		) => {
			try {
				await api.put(`/services/${id}`, {
					title: title,
					price: parseCurrency(price),
				});
				queryClient.invalidateQueries({ queryKey: ["", "services"] });
				toast.success("Serviço editado com sucesso!");
				handleClose();
				reset();
			} catch (error) {
				console.error(error);
				if (error instanceof AxiosError) {
					const errorMessage =
						error.response?.data.message ||
						"Erro inesperado ao editar serviço.";
					setError("root.serverError", {
						type: "server",
						message: errorMessage,
					});
				} else {
					setError("root.serverError", {
						type: "server",
						message: "Erro inesperado ao editar serviço!",
					});
				}
			}
		},
		[queryClient],
	);

	const activeService = useCallback(
		async (id: string) => {
			try {
				setIsLoading(true);
				await api.patch(`/services/${id}/active`);
				queryClient.invalidateQueries({
					queryKey: ["", "services"],
				});
				toast.success("Serviço ativado com sucesso");
			} catch (err) {
				console.error(err);
				if (err instanceof AxiosError) {
					toast.error(
						err.response?.data.message ?? "Erro ao conectar com o servidor.",
					);
				} else {
					toast.error("Ocorreu um erro inesperado.");
				}
			} finally {
				setIsLoading(false);
			}
		},
		[queryClient],
	);

	const inactiveService = useCallback(
		async (id: string) => {
			try {
				setIsLoading(true);
				await api.patch(`/services/${id}/inactive`);
				queryClient.invalidateQueries({
					queryKey: ["", "services"],
				});
				toast.success("Serviço desativado com sucesso");
			} catch (err) {
				console.error(err);
				if (err instanceof AxiosError) {
					toast.error(
						err.response?.data.message ?? "Erro ao conectar com o servidor.",
					);
				} else {
					toast.error("Ocorreu um erro inesperado.");
				}
			} finally {
				setIsLoading(false);
			}
		},
		[queryClient],
	);

	const getService = useCallback(
		async (id: string): Promise<Service | null> => {
			try {
				setIsServiceLoading(true);
				const response = await api.get<Service>(`/services/${id}`);
				return response.data;
			} catch (err) {
				console.error(err);
				if (err instanceof AxiosError) {
					toast.error(
						err.response?.data.message ?? "Erro ao carregar o serviço.",
					);
				} else {
					toast.error("Ocorreu um erro inesperado ao carregar o serviço.");
				}
				return null;
			} finally {
				setIsServiceLoading(false);
			}
		},
		[],
	);

	return {
		createService,
		updateService,
		activeService,
		inactiveService,
		getService,
		isActivatingService: isLoading,
		isGettingService: isServiceLoading,
	};
}
