import { CallToAction } from "./components/callToAction";
import { HomePageHeader } from "../../components/header";
import { FirstSection } from "./components/sections/section1";
import { DailyResumeSection } from "./components/sections/dailyResumeSection";

export function HomePage() {
	return (
		<main className="flex flex-col gap-16 text-primary">
			<HomePageHeader />
			<CallToAction />
			<FirstSection />
			<DailyResumeSection />
		</main>
	);
}
