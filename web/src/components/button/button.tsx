import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
	type ComponentProps,
	createElement,
	type JSX,
	type ReactNode,
} from "react";

export const buttonVariants = cva(
	"rounded-xs flex items-center justify-center cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-70:",
	{
		variants: {
			variant: {
				primary: "bg-gray-200 text-gray-600 not-disabled:hover:bg-gray-100",
				secondary:
					"text-gray-200 bg-gray-500 not-disabled:hover:bg-gray-400 not-disabled:hover:text-gray-100",
				link: "bg-transparent text-gray-300 hover:text-gray-100 hover:bg-gray-500",
			},
			size: {
				sm: "p-2 h-7",
				"icon-sm": "h-7 w-7",
				md: "py-2 px-4 h-10",
				"icon-md": "h-10 w-10",
				none: "py-1 px-2",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "primary",
		},
	},
);

type ButtonProps = Omit<ComponentProps<"button">, "disabled"> &
	VariantProps<typeof buttonVariants> & {
		as?: keyof JSX.IntrinsicElements;
		href?: string;
		className?: string;
		children?: ReactNode;
		isLoading?: boolean;
		disabled?: boolean;
	};

export function Button({
	as = "button",
	size,
	className,
	variant,
	children,
	isLoading = false,
	disabled = false,
	...rest
}: ButtonProps) {
	return createElement(
		as,
		{
			className: buttonVariants({ variant, size, className }),
			disabled: isLoading || disabled,
			...rest,
		},
		isLoading ? (
			<div className="relative">
				<Loader2 size={16} className="animate-spin text-blue-light" />
				<div className="absolute top-0 left-0 h-full w-full animate-[spin_3s_linear_infinite] rounded-full border-blue-dark border-t-2" />
			</div>
		) : (
			children
		),
	);
}
