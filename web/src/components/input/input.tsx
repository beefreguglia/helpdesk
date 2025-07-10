import { Icon } from "../icon";
import { Text } from "../text";

type Props = React.ComponentProps<"input"> & {
	legend?: string;
	helpText?: string;
	errorText?: string;
	endAdornment?: React.ReactNode;
};

export function Input({
	legend,
	id,
	helpText,
	errorText,
	type = "text",
	endAdornment,
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

			<div
				className={`
					w-full flex items-center justify-between rounded-lg border-gray-500 py-2 
					text-sm border-b text-gray-200 bg-transparent outline-none 
					focus-within:border-blue-base 
					${errorText && "focus:border-feedback-danger"}
					`}
			>
				<input
					type={type}
					id={id}
					className="outline-none h-full w-full placeholder:text-gray-400"
					{...rest}
				/>
				{endAdornment && endAdornment}
			</div>

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
