import type { ComponentProps } from "react";

type TableHeaderProps = ComponentProps<"thead">;

export function TableHeader({ children, ...props }: TableHeaderProps) {
	return (
		<thead {...props}>
			<tr>{children}</tr>
		</thead>
	);
}
