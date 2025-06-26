import { api } from "@/services/api";
import { AxiosError } from "axios";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

type TechnicianContext = {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	availability: string[];
	setAvailability: Dispatch<SetStateAction<string[]>>;
	saveTechnician: () => void;
	isTechnicianLoading: boolean;
	errors: FieldErrors;
	clearErrors: () => void;
};

type FieldErrors = {
	name?: string;
	email?: string;
	password?: string;
	availability?: string;
};

const technicianSchema = z.object({
	name: z.string().trim().min(1, "Informe o nome"),
	email: z.string().email({ message: "E-mail inválido" }),
	password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos"),
	availability: z
		.array(z.string())
		.min(1, "Deve ser escolhido pelo menos 1 horário de disponibilidade"),
});

export const TechnicianContext = createContext({} as TechnicianContext);

type TechnicianFormData = z.infer<typeof technicianSchema>;

export function TechnicianProvider({ children }: { children: ReactNode }) {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [availability, setAvailability] = useState<string[]>([]);
	const [isTechnicianLoading, setIsTechnicianLoading] = useState(false);
	const [errors, setErrors] = useState<FieldErrors>({});

	const navigate = useNavigate();

	const clearErrors = () => {
		setErrors({});
	};

	async function saveTechnician() {
		clearErrors();

		try {
			setIsTechnicianLoading(true);

			const data: TechnicianFormData = technicianSchema.parse({
				name,
				email,
				password,
				availability,
			});

			await api.post("/technicians", data);

			setName("");
			setEmail("");
			setPassword("");
			setAvailability([]);

			toast.success("Técnico registrado com sucesso");

			navigate("/technicians");
		} catch (error) {
			console.log(error);

			if (error instanceof ZodError) {
				const newErrors: FieldErrors = {};
				error.issues.forEach((issue) => {
					const fieldName = issue.path[0] as keyof FieldErrors;
					newErrors[fieldName] = issue.message;
				});
				setErrors(newErrors);
			}

			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? "Erro ao conectar com o servidor.",
				);
			}
		} finally {
			setIsTechnicianLoading(false);
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
				saveTechnician,
				isTechnicianLoading,
				errors,
				clearErrors,
			}}
		>
			{children}
		</TechnicianContext.Provider>
	);
}
