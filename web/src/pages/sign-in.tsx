import { Header } from "../core-components/sign-in/header";
import { SignInFormCard } from "../core-components/sign-in/signin-form-card";
import { NavigationCard } from "../core-components/sign-in/navigation-card";

export function SignIn() {
	return (
		<main className="pt-8 px-6 pb-6 bg-gray-600 mt-8 rounded-t-md w-full max-w-[680px] md:px-36 md:py-12 overflow-hidden">
			<Header />
			<div className="overflow-auto h-full">
				<SignInFormCard />
				<NavigationCard />
			</div>
		</main>
	);
}
