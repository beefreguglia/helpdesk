import { Avatar } from "@/components/avatar";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function SidebarFooter() {
	const { session, remove } = useAuth();

	function getLastNames(name: string) {
		if (!name || typeof name !== "string") return "";

		const parts = name.trim().split(/\s+/);
		const first = parts[0];
		const last = parts[parts.length - 1];

		return `${first} ${last}`;
	}

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<footer className=" cursor-pointer mt-auto flex items-center gap-3 border-t border-gray-200 px-4 py-5">
					<Avatar
						size="sm"
						name={session?.user.name ?? ""}
						className="shrink-0"
					/>
					<div className="flex flex-col w-full overflow-hidden">
						<Text
							as="p"
							variant="text-sm"
							className="text-gray-600 truncate"
							title={session?.user.name}
						>
							{getLastNames(session?.user.name ?? "")}
						</Text>
						<Text
							as="p"
							variant="text-xs"
							className="text-gray-400 truncate"
							title={session?.user.email}
						>
							{session?.user.email}
						</Text>
					</div>
				</footer>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					side="right"
					className="bg-gray-100 border border-gray-400 rounded-sm w-[calc(100vw-16px)] mx-2 mb-2 py-4 md:w-[200px]"
				>
					<DropdownMenu.Label asChild>
						<Text variant="text-xxs" className="text-gray-400 px-4 mb-4">
							Opções
						</Text>
					</DropdownMenu.Label>
					<div className="flex flex-col gap-1 mt-4">
						<DropdownMenu.Item className="outline-none rounded-xs px-4 py-2 flex items-center gap-3 hover:bg-gray-200 text-gray-600 cursor-pointer">
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
