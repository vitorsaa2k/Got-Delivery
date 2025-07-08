import { DeliveryManagementCard } from "./deliveryManagementCard";
import { OperationalControlCard } from "./operationalControlCard";
import { PerfomanceAnalyticsCard } from "./performanceAnalyticsCard";

export function CardsFirstSection() {
	return (
		<div className="flex gap-16 justify-center max-lg:flex-col items-center max-lg:max-w-[688px]">
			<DeliveryManagementCard />
			<PerfomanceAnalyticsCard />
			<OperationalControlCard />
		</div>
	);
}
