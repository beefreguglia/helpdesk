import { AxiosError } from "axios";
import {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import { api } from "../services/api";

type AuthContext = {
	session: UserApiResponse | null;
	save: (data: UserApiResponse) => void;
	isLoading: boolean;
	remove: () => void;
	updateProfile: (
		id: string,
		setError: UseFormSetError<{
			name?: string;
			email?: string;
		}>,
		name?: string,
		email?: string,
	) => Promise<void>;
	updateAvatar: (file: File) => Promise<void>;
};

const LOCAL_STORAGE_KEY = "@helpdesk";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<UserApiResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	function save(data: UserApiResponse) {
		localStorage.setItem(
			`${LOCAL_STORAGE_KEY}:user`,
			JSON.stringify(data.user),
		);

		localStorage.setItem(
			`${LOCAL_STORAGE_KEY}:token`,
			JSON.stringify(data.token),
		);

		api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

		setSession(data);
	}

	function remove() {
		setSession(null);

		localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
		localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

		window.location.assign("/");
	}

	const updateProfile = useCallback(
		async (
			id: string,
			setError: UseFormSetError<{
				name?: string;
				email?: string;
			}>,
			name?: string,
			email?: string,
		) => {
			try {
				await api.put(`/users/${id}`, {
					name,
					email,
				});
				setSession((prevSession) =>
					prevSession
						? {
								...prevSession,
								user: {
									...prevSession.user,
									name: name ?? prevSession.user.name,
									email: email ?? prevSession.user.email,
								},
							}
						: null,
				);
				toast.success("Perfil editado com sucesso!");
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
		[],
	);

	async function updateAvatar(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const uploadResponse = await api.post("/uploads", formData);
			const { filename } = uploadResponse.data;

			await api.patch("/users-avatar/update", { fileName: filename });

			if (session) {
				localStorage.setItem(
					`${LOCAL_STORAGE_KEY}:user`,
					JSON.stringify({ ...session.user, imageName: filename }),
				);
				setSession({
					...session,
					user: {
						...session.user,
						imageName: filename,
					},
				});
			}

			toast.success("Avatar atualizado com sucesso!");
		} catch (err) {
			toast.error("Falha ao atualizar o avatar. Tente novamente.");
			console.error("Erro ao atualizar avatar:", err);
		}
	}

	useEffect(() => {
		function loadUser() {
			const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
			const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

			if (user && token) {
				api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;

				setSession({
					token: JSON.parse(token),
					user: JSON.parse(user),
				});
			}

			setIsLoading(false);
		}
		loadUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ session, save, isLoading, remove, updateProfile, updateAvatar }}
		>
			{children}
		</AuthContext.Provider>
	);
}
