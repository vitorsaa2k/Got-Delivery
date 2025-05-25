import { DeliveryManagementCard } from "./deliveryManagementCard";
import { OperationalControlCard } from "./operationalControlCard";
import { PerfomanceAnalyticsCard } from "./performanceAnalyticsCard";

export function CardsFirstSection() {
	return (
		<div className="flex gap-16 justify-center ">
			<DeliveryManagementCard />
			<PerfomanceAnalyticsCard />
			<OperationalControlCard />
		</div>
	);
}
