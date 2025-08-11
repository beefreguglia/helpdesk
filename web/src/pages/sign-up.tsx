import { Header } from "../core-components/sign-up/header";
import { NavigationCard } from "../core-components/sign-up/navigation-card";
import { SignupFormCard } from "../core-components/sign-up/signup-form-card";

export function SignUp() {
	return (
		<main className="mt-8 w-full max-w-[680px] overflow-hidden rounded-t-md bg-gray-600 px-6 pt-8 pb-6 md:px-36 md:py-12">
			<Header />
			<div className="h-full overflow-auto">
				<SignupFormCard />
				<NavigationCard />
			</div>
		</main>
	);
}
