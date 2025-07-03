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

			<select
				id={id}
				className={`
					w-full rounded-lg border-gray-500 py-2 cursor-pointer
					text-sm border-b text-gray-200 bg-transparent outline-none 
					focus:border-blue-base 
					${errorText && "focus:border-feedback-danger"}
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
