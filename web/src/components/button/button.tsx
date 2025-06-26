import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
	type ComponentProps,
	type JSX,
	type ReactNode,
	createElement,
} from "react";

export const buttonVariants = cva(
	"rounded-xs flex items-center justify-center cursor-pointer transition",
	{
		variants: {
			variant: {
				primary: "bg-gray-200 text-gray-600 hover:bg-gray-100",
				secondary:
					"text-gray-200 bg-gray-500 hover:bg-gray-400 hover:text-gray-100",
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
	};

export function Button({
	as = "button",
	size,
	className,
	variant,
	children,
	isLoading = false,
	...rest
}: ButtonProps) {
	return createElement(
		as,
		{
			className: buttonVariants({ variant, size, className }),
			disabled: isLoading,
			...rest,
		},
		isLoading ? (
			<div className="relative">
				<Loader2 size={16} className="text-blue-light animate-spin" />
				<div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-blue-dark animate-[spin_3s_linear_infinite]" />
			</div>
		) : (
			children
		),
	);
}
