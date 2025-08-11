import { AxiosError } from "axios";
import { createContext, type ReactNode, useCallback, useState } from "react";
import { toast } from "sonner";

import { api } from "@/services/api";

type CallContextType = {
	call: CallDetails | null;
	isCallLoading: boolean;
	getCall: (id: string) => Promise<void>;
	finishCall: (id: string) => Promise<void>;
	startCall: (id: string) => Promise<void>;
};

export const CallContext = createContext({} as CallContextType);

export function CallProvider({ children }: { children: ReactNode }) {
	const [call, setCall] = useState<CallDetails | null>(null);
	const [isCallLoading, setIsCallLoading] = useState(false);

	const getCall = useCallback(async (id: string): Promise<void> => {
		try {
			setIsCallLoading(true);
			const response = await api.get<CallDetails>(`/calls/${id}`);
			setCall(response.data);
		} catch (err) {
			console.error(err);
			setCall(null);
			if (err instanceof AxiosError) {
				toast.error(
					err.response?.data.message ?? "Erro ao carregar o chamado.",
				);
			} else {
				toast.error("Ocorreu um erro inesperado ao carregar o chamado.");
			}
		} finally {
			setIsCallLoading(false);
		}
	}, []);

	async function finishCall(id: string) {
		try {
			await api.patch(`/calls/${id}/finish/`);
			await getCall(id);
			toast.success("Chamado encerrado com sucesso!");
		} catch (err) {
			console.error(err);
			if (err instanceof AxiosError) {
				toast.error(
					err.response?.data.message ?? "Erro ao finalizar o chamado.",
				);
			} else {
				toast.error("Ocorreu um erro inesperado ao finalizar o chamado.");
			}
		}
	}

	async function startCall(id: string) {
		try {
			await api.patch(`/calls/${id}/start/`);
			await getCall(id);
			toast.success("Chamado iniciado com sucesso!");
		} catch (err) {
			console.error(err);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message ?? "Erro ao iniciar o chamado.");
			} else {
				toast.error("Ocorreu um erro inesperado ao iniciar o chamado.");
			}
		}
	}

	return (
		<CallContext.Provider
			value={{
				call,
				finishCall,
				startCall,
				getCall,
				isCallLoading,
			}}
		>
			{children}
		</CallContext.Provider>
	);
}
