import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useTechnicians() {
	const queryKey = "/technicians";

	const { data, isLoading } = useQuery<Technician[]>({
		queryKey: queryKey.split("/"),
		queryFn: async () => {
			const { data } = await api.get<{ technicians: Technician[] }>(queryKey);

			return data.technicians;
		},
	});

	return {
		technicians: data || [],
		isLoadingTechnicians: isLoading,
	};
}
