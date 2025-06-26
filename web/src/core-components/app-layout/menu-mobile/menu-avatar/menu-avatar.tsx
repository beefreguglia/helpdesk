import { Avatar } from "@/components/avatar";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function MenuAvatar() {
	const { session, remove } = useAuth();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="cursor-pointer outline-none rounded-full">
				<Avatar name={session?.user.name ?? ""} />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="bg-gray-100 border border-gray-400 rounded-sm w-[calc(100vw-16px)] mx-2 mt-8.5 py-4 md:w-[348px]">
					<DropdownMenu.Label asChild>
						<Text variant="text-xxs" className="text-gray-400 px-4 mb-4">
							Opções
						</Text>
					</DropdownMenu.Label>
					<div className="flex flex-col gap-1 mt-4">
						<DropdownMenu.Item className="rounded-xs py-2 px-4 flex items-center gap-3 hover:bg-gray-200 text-gray-600 cursor-pointer">
							<Icon size="xl" iconName="CircleUser" />
							<Text variant="text-sm">Perfil</Text>
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onClick={remove}
							className="rounded-xs py-2 px-4 flex items-center gap-3 hover:bg-gray-200 text-feedback-danger cursor-pointer"
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
