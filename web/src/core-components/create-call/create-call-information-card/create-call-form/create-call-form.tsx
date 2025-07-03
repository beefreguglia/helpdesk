import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { TextArea } from "@/components/textarea";

export function CreateCallForm() {
	return (
		<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
			<Input
				id="title"
				legend="Título"
				placeholder="Digite..."
				required
				// {...register("email")}
				// errorText={errors.email?.message}
			/>
			<TextArea
				id="description"
				legend="Descrição"
				placeholder="Digite..."
				required
				className="resize-y min-h-20 h-40 max-h-80"
			/>
			<Select
				placeholder="Selecione a categoria de atendimento"
				legend="Categoria de serviço"
				required
				id="category"
			>
				<option value="technical">Técnico</option>
				<option value="administrative">Administrativo</option>
				<option value="other">Outro</option>
			</Select>
		</form>
	);
}
