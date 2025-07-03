import { type VariantProps, cva } from "class-variance-authority";

import { Icon } from "../icon";
import { Text } from "../text";

export const textAreaVariants = cva(
	[
		"font-sans w-full rounded-lg border-b py-2 text-sm bg-transparent",
		"placeholder:text-gray-400",
		"outline-none focus:outline-none focus-visible:outline-none",
		"ring-0 focus:ring-0 focus-visible:ring-0",
		"shadow-none focus:shadow-none appearance-none",
	],
	{
		variants: {
			variant: {
				default: ["text-gray-200", "border-gray-500", "focus:border-blue-base"],
				error: [
					"text-feedback-danger",
					"border-feedback-danger",
					"focus:border-feedback-danger",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type Props = React.ComponentProps<"textarea"> &
	VariantProps<typeof textAreaVariants> & {
		legend?: string;
		errorText?: string;
	};

export function TextArea({
	legend,
	id,
	errorText,
	variant,
	className,
	...rest
}: Props) {
	return (
		<fieldset className="flex flex-col flex-1 focus-within:text-blue-base">
			{legend && (
				<Text
					htmlFor={id}
					as="label"
					variant="text-xxs"
					// The label's color changes if there is an error
					className={errorText ? "text-feedback-danger" : ""}
				>
					{legend}
				</Text>
			)}

			<textarea
				id={id}
				className={textAreaVariants({ className, variant })}
				{...rest}
			/>

			{errorText && (
				<div className="flex items-center gap-1 mt-1.5 text-feedback-danger">
					<Icon size="md" iconName="CircleAlert" />
					<Text variant="text-xs">{errorText}</Text>
				</div>
			)}
		</fieldset>
	);
}
