import { DeliveryTable } from "@/features/deliveriesTable";
import { DayDeliveriesResume } from "@/features/deliveriesTable/components/dayDeliveriesResume";
import { DeliveryForm } from "@/features/deliveryForm";

export default function Home() {
	return (
		<main>
			<DeliveryForm />
			<DeliveryTable />
			<DayDeliveriesResume />
		</main>
	);
}
