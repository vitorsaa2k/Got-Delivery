import { CardsFirstSection } from "./cards";
import { Description } from "./description";
import { Title } from "./title";

export function FirstSection() {
	return (
		<section className="flex flex-col px-8 gap-6 items-center">
			<div className="flex flex-col items-center max-md:gap-2">
				<Title />
				<Description />
			</div>
			<CardsFirstSection />
		</section>
	);
}
