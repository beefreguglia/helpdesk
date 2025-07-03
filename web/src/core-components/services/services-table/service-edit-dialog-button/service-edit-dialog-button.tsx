import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

import { Button } from "@/components/button";
import { DialogContent, DialogRoot, DialogTrigger } from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

import { useState } from "react";
import { ServiceForm } from "../../service-form";

type ServiceEditDialogButtonProps = {
	id: string;
};

export function ServiceEditDialogButton({ id }: ServiceEditDialogButtonProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="icon-sm">
					<Icon iconName="PenLine" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<header className="flex items-center justify-between w-full px-6 py-5">
					<DialogTitle asChild>
						<Text variant="text-md-bold" as="h3">
							Serviço
						</Text>
					</DialogTitle>
					<DialogClose asChild>
						<Button size="icon-sm" variant="link">
							<Icon className="text-gray-300" iconName="X" />
						</Button>
					</DialogClose>
				</header>
				<ServiceForm
					handleClose={() => setIsDialogOpen(false)}
					isUpdatingService
					serviceId={id}
				/>
			</DialogContent>
		</DialogRoot>
	);
}
