import { Outlet } from "react-router";

export function AuthLayout() {
	return (
		<div className="w-full h-screen bg-[url('/src/assets/images/auth-background.png')] bg-center bg-cover bg-no-repeat flex justify-end overflow-hidden text-gray-200">
			<Outlet />
		</div>
	);
}
