import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type JSX } from "react";

export const containerVariants = cva("mx-auto", {
	variants: {
		size: {
			md: "max-w-[75rem] px-2",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type ContainerProps = VariantProps<typeof containerVariants> &
	React.ComponentProps<"div"> & {
		as?: keyof JSX.IntrinsicElements;
	};

export function Container({
	as = "div",
	className,
	children,
	...props
}: ContainerProps) {
	return createElement(
		as,
		{
			className: containerVariants({ size: "md", className }),
			...props,
		},
		children,
	);
}
