import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

export function useServicesActive() {
	const queryKey = "/services/active";

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
