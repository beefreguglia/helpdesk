import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type ComponentProps, type JSX } from "react";

export const cardVariants = cva(
	`
    rounded-sm border border-solid border-gray-500
    bg-gray-600 shadow-sm
  `,
	{
		variants: {
			size: {
				none: "",
				md: "p-7",
			},
		},
		defaultVariants: {
			size: "none",
		},
	},
);

type CardProps = VariantProps<typeof cardVariants> &
	ComponentProps<"div"> & {
		as?: keyof JSX.IntrinsicElements;
	};

export function Card({
	as = "div",
	size,
	className,
	children,
	...props
}: CardProps) {
	return createElement(
		as,
		{
			className: cardVariants({ size, className }),
			...props,
		},
		children,
	);
}
