"use client";
import { DeliveryTable } from "@/features/deliveriesTable";
import { DayDeliveriesResume } from "@/features/dayDeliveriesResume";
import { DeliveryForm } from "@/features/deliveryForm";
import { DateSelector } from "@/features/deliveryForm/components/dateSelector";

export default function Home() {
	return (
		<main className="flex justify-between p-9 max-lg:flex-col max-sm:items-center gap-16">
			<div className="w-full">
				<DateSelector />
				<DeliveryForm />
				<DeliveryTable />
			</div>
			<DayDeliveriesResume />
		</main>
	);
}
