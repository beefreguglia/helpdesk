import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

export const tableVariants = cva(
	"table w-full table-fixed border border-gray-500 shadow-md rounded-sm overflow-hidden",
);

type TableRootProps = ComponentProps<"table">;

export function TableRoot({ children, className, ...props }: TableRootProps) {
	return (
		<table className={tableVariants({ className })} {...props}>
			{children}
		</table>
	);
}
