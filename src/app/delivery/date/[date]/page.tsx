import { DeliveryTable } from "@/features/deliveriesTable";
import { DayDeliveriesResume } from "@/features/dayDeliveriesResume";
import { DeliveryForm } from "@/features/deliveryForm";
import { DateSelector } from "@/features/deliveryForm/components/dateSelector";
import { DashboardLayout } from "@/features/dashboard/layout";

export default function Home() {
	return (
		<DashboardLayout>
			<div className="flex justify-between w-full p-9 max-lg:flex-col max-sm:items-center gap-16">
				<div className="w-full">
					<DateSelector />
					<DeliveryForm />
					<DeliveryTable />
				</div>
				<DayDeliveriesResume />
			</div>
		</DashboardLayout>
	);
}
