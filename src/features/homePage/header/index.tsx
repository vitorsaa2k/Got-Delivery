import { LoginButtons } from "./login";
import { Logo } from "./logo";
import { HomePageNav } from "./nav";

export function HomePageHeader() {
	return (
		<header className="flex justify-center gap-16 px-32 py-4">
			<Logo />
			<HomePageNav />
			<LoginButtons />
		</header>
	);
}
