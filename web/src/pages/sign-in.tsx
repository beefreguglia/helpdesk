import { Header } from "../core-components/sign-in/header";
import { NavigationCard } from "../core-components/sign-in/navigation-card";
import { SignInFormCard } from "../core-components/sign-in/signin-form-card";

export function SignIn() {
	return (
		<main className="mt-8 w-full max-w-[680px] overflow-hidden rounded-t-md bg-gray-600 px-6 pt-8 pb-6 md:px-36 md:py-12">
			<Header />
			<div className="h-full overflow-auto">
				<SignInFormCard />
				<NavigationCard />
			</div>
		</main>
	);
}
