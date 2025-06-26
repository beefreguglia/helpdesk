import { Header } from "../core-components/sign-up/header";
import { NavigationCard } from "../core-components/sign-up/navigation-card";
import { SignupFormCard } from "../core-components/sign-up/signup-form-card";

export function SignUp() {
	return (
		<main className="pt-8 px-6 pb-6 bg-gray-600 mt-8 rounded-t-md w-full max-w-[680px] md:px-36 md:py-12 overflow-hidden">
			<Header />
			<div className="overflow-auto h-full">
				<SignupFormCard />
				<NavigationCard />
			</div>
		</main>
	);
}
