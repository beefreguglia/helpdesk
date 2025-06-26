import type { ComponentProps } from "react";

type TableBodyProps = ComponentProps<"tbody">;

export function TableBody({ children, ...rest }: TableBodyProps) {
	return <tbody {...rest}>{children}</tbody>;
}
