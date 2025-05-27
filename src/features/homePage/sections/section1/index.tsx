import { CardsFirstSection } from "./cards";
import { Description } from "./description";
import { Title } from "./title";

export function FirstSection() {
	return (
		<section className="flex flex-col px-8 gap-6">
			<div className="flex flex-col items-center">
				<Title />
				<Description />
			</div>
			<CardsFirstSection />
		</section>
	);
}
