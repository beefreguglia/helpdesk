import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Text } from "@/components/text";

const tableHeaderItemVariants = cva("px-3 py-3.5 text-left text-gray-400");

type TableHeaderItemProps = ComponentProps<"th">;

export function TableHeaderItem({
	children,
	className,
	...props
}: TableHeaderItemProps) {
	return (
		<th className={tableHeaderItemVariants({ className })} {...props}>
			<Text variant="text-sm-bold">{children}</Text>
		</th>
	);
}
