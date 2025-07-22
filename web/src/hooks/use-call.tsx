import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { api } from "@/services/api";

export function useCall() {
	const [isCallLoading, setIsCallLoading] = useState(false);

	const getCall = useCallback(
		async (id: string): Promise<CallDetails | null> => {
			try {
				setIsCallLoading(true);
				const response = await api.get<CallDetails>(`/calls/${id}`);
				return response.data;
			} catch (err) {
				console.error(err);
				if (err instanceof AxiosError) {
					toast.error(
						err.response?.data.message ?? "Erro ao carregar o chamado.",
					);
				} else {
					toast.error("Ocorreu um erro inesperado ao carregar o chamado.");
				}
				return null;
			} finally {
				setIsCallLoading(false);
			}
		},
		[],
	);

	return {
		getCall,
		isCallLoading,
	};
}
