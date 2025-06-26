import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

const statusTagVariants = cva(
	"rounded-full py-1 px-1.5 inline-flex items-center gap-1.5",
	{
		variants: {
			variant: {
				open: "text-feedback-open bg-feedback-open/20",
				info: "text-feedback-progress bg-feedback-progress/20",
				success: "text-shadow-feedback-done bg-feedback-done/20",
				danger: "text-feedback-danger bg-feedback-danger/20",
			},
		},
	},
);

export type StatusTagProps = VariantProps<typeof statusTagVariants> &
	Omit<ComponentProps<"span">, "children"> & {
		onlyIcon?: boolean;
	};

export function StatusTag({
	variant = "open",
	className,
	onlyIcon = false,
	...rest
}: StatusTagProps) {
	switch (variant) {
		case "open":
			return (
				<span className={statusTagVariants({ className, variant })} {...rest}>
					<Icon size="md" iconName="CircleHelp" />
					{!onlyIcon && (
						<Text variant="text-xs-bold" className="hidden md:flex">
							Aberto
						</Text>
					)}
				</span>
			);
		case "danger":
			return (
				<span className={statusTagVariants({ className, variant })} {...rest}>
					<Icon size="md" iconName="CircleCheck" />
					{!onlyIcon && (
						<Text variant="text-xs-bold" className="hidden md:flex">
							Atrasado
						</Text>
					)}
				</span>
			);
		case "info":
			return (
				<span className={statusTagVariants({ className, variant })} {...rest}>
					<Icon size="md" iconName="Clock2" />
					{!onlyIcon && (
						<Text variant="text-xs-bold" className="hidden md:flex">
							Em andamento
						</Text>
					)}
				</span>
			);
		case "success":
			return (
				<span className={statusTagVariants({ className, variant })} {...rest}>
					<Icon size="md" iconName="CircleHelp" />
					{!onlyIcon && (
						<Text variant="text-xs-bold" className="hidden md:flex">
							Encerrado
						</Text>
					)}
				</span>
			);
	}
}
