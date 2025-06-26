import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

const tableBodyItemVariants = cva("px-3 py-3.5 align-top");

type TableBodyItemProps = ComponentProps<"td">;

export function TableBodyItem({
	children,
	className,
	...rest
}: TableBodyItemProps) {
	return (
		<td className={tableBodyItemVariants({ className })} {...rest}>
			{children}
		</td>
	);
}
