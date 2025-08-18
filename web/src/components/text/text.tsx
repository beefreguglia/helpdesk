import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type JSX, type ReactNode } from "react";

export const textVariants = cva("font-sans", {
	variants: {
		variant: {
			"text-xxs": "text-xxs leading-[1.4] font-bold uppercase",
			"text-xs": "text-xs leading-1.4 font-normal",
			"text-xs-bold": "text-xs leading-1.4 font-bold",
			"text-sm": "text-sm leading-1.4 font-normal",
			"text-sm-bold": "text-sm leading-1.4 font-bold",
			"text-md": "text-md leading-1.4 font-normal",
			"text-md-bold": "text-md leading-1.4 font-bold",
			"text-lg": "text-lg leading-1.4 font-bold",
			"text-xl": "text-xl leading-1.4 font-bold",
			"text-2xl": "text-2xl leading-1.4",
		},
	},
	defaultVariants: {
		variant: "text-md",
	},
});

type TextProps = VariantProps<typeof textVariants> & {
	as?: keyof JSX.IntrinsicElements;
	className?: string;
	children?: ReactNode;
	htmlFor?: string;
	title?: string;
	onClick?: () => void;
};

export function Text({
	as = "span",
	variant,
	className,
	children,
	htmlFor,
	...props
}: TextProps) {
	return createElement(
		as,
		{ className: textVariants({ variant, className }), htmlFor, ...props },
		children,
	);
}
