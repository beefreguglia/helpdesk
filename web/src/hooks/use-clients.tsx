import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useClients() {
	const queryKey = "/clients";

	const { data, isLoading } = useQuery<Client[]>({
		queryKey: queryKey.split("/"),
		queryFn: async () => {
			const { data } = await api.get<{ clients: Client[] }>(queryKey);

			return data.clients;
		},
	});

	return {
		clients: data || [],
		isLoadingClients: isLoading,
	};
}
