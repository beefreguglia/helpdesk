import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";

const activeTagVariants = cva(
	"rounded-full py-1 px-1.5 inline-flex items-center gap-1.5",
	{
		variants: {
			active: {
				false: "text-feedback-danger bg-feedback-danger/20",
				true: "text-feedback-done bg-feedback-done/20",
			},
		},
	},
);

export type ActiveTagProps = VariantProps<typeof activeTagVariants> &
	Omit<ComponentProps<"span">, "children"> & {
		onlyIcon?: boolean;
	};

export function ActiveTag({
	active = false,
	className,
	onlyIcon = false,
	...rest
}: ActiveTagProps) {
	return (
		<span className={activeTagVariants({ className, active })} {...rest}>
			{onlyIcon && <Icon size="md" iconName={active ? "CircleCheck" : "Ban"} />}
			{!onlyIcon && (
				<Text variant="text-xs-bold" className="hidden md:flex">
					{active ? "Ativo" : "Inativo"}
				</Text>
			)}
		</span>
	);
}
