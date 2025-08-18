import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/components/avatar";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";

export function MenuAvatar() {
	const { session, remove } = useAuth();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="cursor-pointer rounded-full outline-none">
				<Avatar
					fileName={session?.user.imageName}
					name={session?.user.name ?? ""}
				/>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="mx-2 mt-8.5 w-[calc(100vw-16px)] rounded-sm border border-gray-400 bg-gray-100 py-4 md:w-[348px]">
					<DropdownMenu.Label asChild>
						<Text variant="text-xxs" className="mb-4 px-4 text-gray-400">
							Opções
						</Text>
					</DropdownMenu.Label>
					<div className="mt-4 flex flex-col gap-1">
						<DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xs px-4 py-2 text-gray-600 hover:bg-gray-200">
							<Icon size="xl" iconName="CircleUser" />
							<Text variant="text-sm">Perfil</Text>
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onClick={remove}
							className="flex cursor-pointer items-center gap-3 rounded-xs px-4 py-2 text-feedback-danger hover:bg-gray-200"
						>
							<Icon size="xl" iconName="LogOut" />
							<Text variant="text-sm">Sair</Text>
						</DropdownMenu.Item>
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
