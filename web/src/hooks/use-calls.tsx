import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useCalls() {
	const queryKey = "/calls";

	const { data, isLoading } = useQuery<Call[]>({
		queryKey: queryKey.split("/"),
		queryFn: async () => {
			const { data } = await api.get<{ calls: Call[] }>(queryKey);

			return data.calls;
		},
	});

	return {
		calls: data || [],
		isLoadingCalls: isLoading,
	};
}
