import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { Text } from "../text";
import { Icon } from "../icon";

const timeTagVariants = cva(
	"rounded-full p-1.5 px-3 inline-flex items-center gap-1.5 ",
	{
		variants: {
			variant: {
				default: "border border-gray-400 hover:bg-gray-500 cursor-pointer",
				selected:
					"border text-gray-500 bg-blue-base border-blue-base cursor-pointer hover:bg-blue-dark hover:border-blue-dark",
				readOnly: "select-none border border-gray-500 text-gray-400",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type TimeTagProps = VariantProps<typeof timeTagVariants> &
	Omit<ComponentProps<"span">, "onClick"> & {
		selected?: boolean;
		handleSelectTag?: () => void;
		handleRemoveTag?: (event: React.MouseEvent) => void;
	};

export function TimeTag({
	variant = "default",
	className,
	children,
	selected = false,
	handleSelectTag,
	handleRemoveTag,
	...rest
}: TimeTagProps) {
	return (
		<Text
			variant="text-xs-bold"
			className={timeTagVariants({
				className,
				variant: selected ? "selected" : variant,
			})}
			onClick={handleSelectTag}
			{...rest}
		>
			{children}
			{selected && handleRemoveTag && (
				<Icon
					onClick={(event) => {
						event.stopPropagation();
						handleRemoveTag(event);
					}}
					size="sm"
					iconName="X"
				/>
			)}
		</Text>
	);
}
