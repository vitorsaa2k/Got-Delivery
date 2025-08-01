import { LoginButtons } from "./login";
import { Logo } from "./logo";
import { HomePageNav } from "./nav";

export function HomePageHeader() {
	return (
		<header className="flex justify-center gap-16 py-4 sticky top-0">
			<Logo />
			<HomePageNav />
			<LoginButtons />
		</header>
	);
}
