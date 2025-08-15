import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/components/avatar";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/use-auth";
import { ProfileDialogButton } from "./profile-dialog-button";

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
				<footer className=" mt-auto flex cursor-pointer items-center gap-3 border-gray-200 border-t px-4 py-5">
					<Avatar
						size="sm"
						name={session?.user.name ?? ""}
						className="shrink-0"
					/>
					<div className="flex w-full flex-col overflow-hidden">
						<Text
							as="p"
							variant="text-sm"
							className="truncate text-gray-600"
							title={session?.user.name}
						>
							{getLastNames(session?.user.name ?? "")}
						</Text>
						<Text
							as="p"
							variant="text-xs"
							className="truncate text-gray-400"
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
					className="mx-2 mb-2 w-[calc(100vw-16px)] rounded-sm border border-gray-400 bg-gray-100 py-4 md:w-[200px]"
				>
					<DropdownMenu.Label asChild>
						<Text variant="text-xxs" className="mb-4 px-4 text-gray-400">
							Opções
						</Text>
					</DropdownMenu.Label>
					<div className="mt-4 flex flex-col gap-1">
						<ProfileDialogButton />
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
