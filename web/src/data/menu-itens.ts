import type * as LucideIcons from "lucide-react";

export interface MenuItem {
	id: string;
	title: string;
	iconName: keyof typeof LucideIcons;
	userRoles: UserApiRole[];
	route: string;
}

export const menuItems: MenuItem[] = [
	{
		id: "calls",
		title: "Chamados",
		iconName: "ClipboardList",
		userRoles: ["ADMIN"],
		route: "/",
	},
	{
		id: "technicians",
		title: "Técnicos",
		iconName: "Users",
		userRoles: ["ADMIN"],
		route: "/technicians",
	},
	{
		id: "clients",
		title: "Clientes",
		iconName: "BriefcaseBusiness",
		userRoles: ["ADMIN"],
		route: "/clients",
	},
	{
		id: "services",
		title: "Serviços",
		iconName: "Wrench",
		userRoles: ["ADMIN"],
		route: "/services",
	},
	{
		id: "technician-calls",
		title: "Meus chamados",
		iconName: "ClipboardList",
		userRoles: ["TECHNICIAN"],
		route: "/",
	},
	{
		id: "client-calls",
		title: "Meus chamados",
		iconName: "ClipboardList",
		userRoles: ["CLIENT"],
		route: "/",
	},
	{
		id: "client-calls",
		title: "Criar chamados",
		iconName: "Plus",
		userRoles: ["CLIENT"],
		route: "/",
	},
];
