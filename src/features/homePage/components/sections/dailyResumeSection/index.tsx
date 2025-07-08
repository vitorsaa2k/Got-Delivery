import { DailyResumeDescription } from "./description";
import { DayDeliveriesResume } from "./main/dayDeliveriesResume";
import { Informations } from "./main/informations";
import { DailyResumeTitle } from "./title";

export function DailyResumeSection() {
	return (
		<section className="flex flex-col gap-6 p-4">
			<div>
				<DailyResumeTitle />
				<DailyResumeDescription />
			</div>
			<div className="flex max-lg:flex-col justify-center items-center lg:gap-32">
				<Informations />
				<DayDeliveriesResume />
			</div>
		</section>
	);
}
