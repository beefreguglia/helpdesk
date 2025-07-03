import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useServices() {
	const queryKey = "/services";

	const { data, isLoading } = useQuery<Service[]>({
		queryKey: queryKey.split("/"),
		queryFn: async () => {
			const { data } = await api.get<{ services: Service[] }>(queryKey);

			return data.services;
		},
	});

	return {
		services: data || [],
		isLoadingServices: isLoading,
	};
}
