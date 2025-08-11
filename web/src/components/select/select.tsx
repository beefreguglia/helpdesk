import { Text } from "../text";

type Props = React.ComponentProps<"select"> & {
	legend?: string;
	errorText?: string;
	placeholder?: string;
};

export function Select({
	legend,
	children,
	errorText,
	id,
	placeholder,
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

			<select
				id={id}
				className={`w-full cursor-pointer rounded-lg border-gray-500 border-b bg-transparent py-2 text-gray-200 text-sm outline-none focus:border-blue-base${errorText && "focus:border-feedback-danger"}
				`}
				{...rest}
			>
				{placeholder && (
					<option value="" selected disabled hidden>
						{placeholder}
					</option>
				)}
				{children}
			</select>
		</fieldset>
	);
}
