import { createContext, type ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthContext = {
	session: UserApiResponse | null;
	save: (data: UserApiResponse) => void;
	isLoading: boolean;
	remove: () => void;
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
		<AuthContext.Provider value={{ session, save, isLoading, remove }}>
			{children}
		</AuthContext.Provider>
	);
}
