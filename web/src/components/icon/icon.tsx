import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, FC } from "react";
import * as LucideIcons from "lucide-react";

export const iconVariants = cva("", {
	variants: {
		animate: {
			false: "",
			true: "animate-spin",
		},
		size: {
			sm: "w-3.5 h-3.5",
			md: "w-4 h-4",
			lg: "w-4.5 h-4.5",
			xl: "w-5 h-5",
			xxl: "w-10 h-10",
			xxxl: "w-11 h-11",
		},
	},
	defaultVariants: {
		animate: false,
		size: "md",
	},
});

type IconProps = ComponentProps<"svg"> &
	VariantProps<typeof iconVariants> & {
		svg?: FC<ComponentProps<"svg">>;
		iconName?: keyof typeof LucideIcons;
	};

export function Icon({
	svg: SVGComponent,
	animate,
	className,
	size,
	iconName,
	...props
}: IconProps) {
	let RenderComponent: FC<ComponentProps<"svg">> | undefined = undefined;

	if (iconName) {
		const IconFromLibrary = LucideIcons[iconName];
		if (
			typeof IconFromLibrary === "function" ||
			(typeof IconFromLibrary === "object" && IconFromLibrary !== null)
		) {
			RenderComponent = IconFromLibrary as FC<ComponentProps<"svg">>;
		}
	}

	if (!RenderComponent && SVGComponent) {
		RenderComponent = SVGComponent;
	}

	if (!RenderComponent) return null;

	return (
		<RenderComponent
			className={iconVariants({ animate, className, size })}
			{...props}
		/>
	);
}
