import { Icon } from "../icon";
import { Text } from "../text";

type Props = React.ComponentProps<"input"> & {
	legend?: string;
	helpText?: string;
	errorText?: string;
};

export function Input({
	legend,
	id,
	helpText,
	errorText,
	type = "text",
	...rest
}: Props) {
	return (
		<fieldset className="flex flex-col flex-1 focus-within:text-blue-base!">
			{legend && (
				<Text
					htmlFor={id}
					as="label"
					variant="text-xxs"
					className={`${errorText && "text-feedback-danger"}`}
				>
					{legend}
				</Text>
			)}

			<input
				type={type}
				id={id}
				className={`
					w-full rounded-lg border-gray-500 py-2 
					text-sm border-b text-gray-200 bg-transparent outline-none 
					focus:border-blue-base placeholder:text-gray-400
					${errorText && "focus:border-feedback-danger"}
				`}
				{...rest}
			/>

			{helpText && !errorText && (
				<Text variant="text-xs" className="text-gray-400 italic mt-1.5">
					{helpText}
				</Text>
			)}

			{errorText && (
				<div className="flex items-center gap-1 mt-1.5 text-feedback-danger">
					<Icon size="md" iconName="CircleAlert" />
					<Text variant="text-xs">{errorText}</Text>
				</div>
			)}
		</fieldset>
	);
}
