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
		<fieldset className="flex flex-1 flex-col focus-within:text-blue-base!">
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
				className={`flex w-full items-center justify-between rounded-lg border-gray-500 border-b bg-transparent py-2 text-gray-200 text-sm outline-none focus-within:border-blue-base${errorText && "focus:border-feedback-danger"}
					`}
			>
				<input
					type={type}
					id={id}
					className="h-full w-full px-1 outline-none placeholder:text-gray-400"
					{...rest}
				/>
				{endAdornment && endAdornment}
			</div>

			{helpText && !errorText && (
				<Text variant="text-xs" className="mt-1.5 text-gray-400 italic">
					{helpText}
				</Text>
			)}

			{errorText && (
				<div className="mt-1.5 flex items-center gap-1 text-feedback-danger">
					<Icon size="md" iconName="CircleAlert" />
					<Text variant="text-xs">{errorText}</Text>
				</div>
			)}
		</fieldset>
	);
}
