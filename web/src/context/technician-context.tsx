import { AxiosError } from "axios";
import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { api } from "@/services/api";

type TechnicianContextType = {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	availability: string[];
	setAvailability: Dispatch<SetStateAction<string[]>>;
	createTechnician: (data: CreateTechnicianPayload) => Promise<void>;
	updateTechnician: (
		id: string,
		data: UpdateTechnicianPayload,
	) => Promise<void>;
	isLoading: boolean;
	error: string | null;
	errors: FieldErrors;
	clearErrors: () => void;
	getTechnician: (id: string) => Promise<void>;
};

type FieldErrors = {
	name?: string;
	email?: string;
	password?: string;
	availability?: string;
};

const createTechnicianSchema = z.object({
	name: z.string().trim().min(1, "Informe o nome"),
	email: z.string().email({ message: "E-mail inválido" }),
	password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos"),
	availability: z
		.array(z.string())
		.min(1, "Deve ser escolhido pelo menos um horário de atuação"),
});

const updateTechnicianSchema = z.object({
	name: z.string().trim().min(1, "Informe o nome").optional(),
	email: z.string().email({ message: "E-mail inválido" }).optional(),
	availability: z.array(z.string()).optional(),
});

export const TechnicianContext = createContext({} as TechnicianContextType);

type CreateTechnicianPayload = z.infer<typeof createTechnicianSchema>;
type UpdateTechnicianPayload = z.infer<typeof updateTechnicianSchema>;

interface Technician {
	id: string;
	name: string;
	email: string;
	availability: string[];
}

export function TechnicianProvider({ children }: { children: ReactNode }) {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [availability, setAvailability] = useState<string[]>([
		"08:00",
		"12:00",
		"14:00",
		"18:00",
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errors, setErrors] = useState<FieldErrors>({});

	const navigate = useNavigate();

	const clearErrors = () => {
		setErrors({});
		setError(null);
	};

	async function createTechnician(data: CreateTechnicianPayload) {
		clearErrors();
		setError(null);

		try {
			setIsLoading(true);

			const validatedData = createTechnicianSchema.parse(data);

			await api.post("/technicians", validatedData);

			setName("");
			setEmail("");
			setPassword("");
			setAvailability([]);

			toast.success("Técnico registrado com sucesso");
			navigate("/technicians");
		} catch (err) {
			console.error(err);

			if (err instanceof ZodError) {
				const newErrors: FieldErrors = {};
				err.issues.forEach((issue) => {
					const fieldName = issue.path[0] as keyof FieldErrors;
					newErrors[fieldName] = issue.message;
				});
				setErrors(newErrors);
			} else if (err instanceof AxiosError) {
				setError(
					err.response?.data.message ?? "Erro ao conectar com o servidor.",
				);
				toast.error(
					err.response?.data.message ?? "Erro ao conectar com o servidor.",
				);
			} else {
				setError("Ocorreu um erro inesperado.");
				toast.error("Ocorreu um erro inesperado.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	async function updateTechnician(id: string, data: UpdateTechnicianPayload) {
		clearErrors();
		setError(null);

		try {
			setIsLoading(true);

			const validatedData = updateTechnicianSchema.parse(data);

			const filteredData = Object.fromEntries(
				Object.entries(validatedData).filter(
					([, value]) => value !== undefined && value !== "",
				),
			);

			await api.put(`/technicians/${id}`, filteredData);

			toast.success("Informações do técnico atualizadas com sucesso");
			navigate("/technicians");
		} catch (err) {
			console.error(err);

			if (err instanceof ZodError) {
				const newErrors: FieldErrors = {};
				err.issues.forEach((issue) => {
					const fieldName = issue.path[0] as keyof FieldErrors;
					newErrors[fieldName] = issue.message;
				});
				setErrors(newErrors);
			} else if (err instanceof AxiosError) {
				setError(
					err.response?.data.message ?? "Erro ao conectar com o servidor.",
				);
				toast.error(
					err.response?.data.message ?? "Erro ao conectar com o servidor.",
				);
			} else {
				setError("Ocorreu um erro inesperado.");
				toast.error("Ocorreu um erro inesperado.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	async function getTechnician(id: string) {
		setIsLoading(true);
		setError(null);
		try {
			const { data } = await api.get<Technician>(`/technicians/${id}`);
			setName(data.name);
			setEmail(data.email);
			setAvailability(data.availability);
			setPassword("");
		} catch (err) {
			console.error(err);
			if (err instanceof AxiosError) {
				setError(err.response?.data.message ?? "Erro ao carregar técnico.");
				toast.error(err.response?.data.message ?? "Erro ao carregar técnico.");
			} else {
				setError("Ocorreu um erro inesperado ao carregar o técnico.");
				toast.error("Ocorreu um erro inesperado ao carregar o técnico.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<TechnicianContext.Provider
			value={{
				name,
				setName,
				availability,
				email,
				password,
				setAvailability,
				setEmail,
				setPassword,
				createTechnician,
				updateTechnician,
				isLoading,
				error,
				errors,
				clearErrors,
				getTechnician,
			}}
		>
			{children}
		</TechnicianContext.Provider>
	);
}
