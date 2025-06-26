import * as DialogPrimitive from "@radix-ui/react-dialog";

type DialogProps = DialogPrimitive.DialogProps;

export function DialogRoot({ children, ...props }: DialogProps) {
	return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

type DialogTriggerProps = DialogPrimitive.DialogTriggerProps;

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
	return (
		<DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
	);
}

type DialogContentProps = DialogPrimitive.DialogContentProps;

export function DialogContent({ children, ...props }: DialogContentProps) {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="fixed inset-0 bg-gray-100/50" />
			<DialogPrimitive.Content
				className="fixed top-1/2 left-1/2 -translate-1/2 px-4 w-full flex items-center justify-center"
				{...props}
			>
				<div className="bg-gray-600 w-full max-w-[27.5rem] rounded-sm">
					{children}
				</div>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}
