import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../text";

const avatarVariants = cva(
	"inline-flex items-center justify-cente aspect-square align-middle overflow-hidden select-none rounded-full",
	{
		variants: {
			size: {
				xs: "h-5 w-5",
				sm: "h-8 w-8",
				md: "w-10 h-10",
				lg: "w-12 h-12",
				xl: "w-24 h-24",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

type AvatarProps = VariantProps<typeof avatarVariants> & {
	name: string;
	fileName?: string;
	className?: string;
};

export function Avatar({ name, size, fileName, className }: AvatarProps) {
	function getFirstAndLastInitial(fullName: string): string {
		const nameParts = fullName.trim().split(" ");

		if (nameParts.length === 1) {
			return nameParts[0].charAt(0).toUpperCase();
		}

		const firstInitial = nameParts[0].charAt(0).toUpperCase();
		const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

		return `${firstInitial}${lastInitial}`;
	}

	function handleTextVariant(
		size: "xs" | "sm" | "md" | "lg" | "xl" | null | undefined,
	):
		| "text-xxs"
		| "text-sm"
		| "text-xs"
		| "text-xs-bold"
		| "text-sm-bold"
		| "text-md"
		| "text-md-bold"
		| "text-lg"
		| "text-xl"
		| "text-2xl"
		| null
		| undefined {
		switch (size) {
			case "xs": {
				return "text-xxs";
			}
			case "lg": {
				return "text-md";
			}
			case "xl": {
				return "text-2xl";
			}

			default: {
				return "text-sm";
			}
		}
	}

	return (
		<AvatarPrimitive.Root className={avatarVariants({ size, className })}>
			<AvatarPrimitive.Image
				className="h-full w-full rounded-full object-cover"
				src={fileName && `${import.meta.env.VITE_API_URL}/uploads/${fileName}`}
				alt={name}
			/>
			<AvatarPrimitive.Fallback
				className="flex h-full w-full items-center justify-center bg-blue-dark text-gray-600"
				delayMs={600}
			>
				<Text variant={handleTextVariant(size)}>
					{getFirstAndLastInitial(name)}
				</Text>
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	);
}
