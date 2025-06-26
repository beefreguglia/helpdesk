import { Input } from "@/components/input";

export function ServiceForm() {
	return (
		<form className="p-6 border-y border-gray-500 flex flex-col gap-4">
			<Input legend="Título" id="title" />
			<Input legend="Valor" id="value" />
		</form>
	);
}
