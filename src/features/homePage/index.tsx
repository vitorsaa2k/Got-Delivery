import { CallToAction } from "./callToAction";
import { HomePageHeader } from "./header";
import { FirstSection } from "./sections/section1";

export function HomePage() {
	return (
		<main className="flex flex-col gap-16 text-primary">
			<HomePageHeader />
			<CallToAction />
			<FirstSection />
		</main>
	);
}
