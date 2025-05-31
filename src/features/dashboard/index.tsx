"use client";
import { useQuery } from "@tanstack/react-query";
import { LastWeekDeliveriesChart } from "./charts/lastWeekDeliveries";
import { useSession } from "next-auth/react";
import { fetchDeliveryResume } from "@/services/delivery";

export function DashboardHome() {
	const session = useSession();
	const { data } = useQuery({
		queryKey: ["deliveriesResume"],
		queryFn: async () => {
			const resume = await fetchDeliveryResume(session.data!.user.id);
			console.log(resume);
			return resume;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	if (!data) return <></>;
	return (
		<main className="flex justify-between p-9 max-lg:flex-col max-sm:items-center gap-16">
			<LastWeekDeliveriesChart
				lastWeekDeliveries={data.deliveriesLastWeek}
			></LastWeekDeliveriesChart>
		</main>
	);
}
