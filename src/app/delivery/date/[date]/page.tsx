"use client";
import { DeliveryTable } from "@/features/deliveriesTable";
import { DayDeliveriesResume } from "@/features/deliveriesTable/components/dayDeliveriesResume";
import { DeliveryForm } from "@/features/deliveryForm";
import { DateSelector } from "@/features/deliveryForm/components/dateSelector";

export default function Home() {
	return (
		<main>
			<DateSelector />
			<DeliveryForm />
			<DeliveryTable />
			<DayDeliveriesResume />
		</main>
	);
}
