"use client";
import { fetchAllMotoboys } from "@/services/motoboy";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useQuery } from "@tanstack/react-query";
import { MotoboyDashboardItem } from "./motoboyItem";
import { MostDeliveriesChart } from "./topDeliveriesChart";

export function Motoboy() {
	const updateMotoboyList = useMotoboyStore(state => state.updateMotoboyList);
	const { data: motoboyList } = useQuery({
		queryKey: ["motoboyList"],
		queryFn: async () => {
			const motoboyList = await fetchAllMotoboys();
			updateMotoboyList(motoboyList);
			return motoboyList;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	if (!motoboyList) return <></>;
	return (
		<div>
			<MostDeliveriesChart />
			<div>
				{motoboyList.map(motoboy => (
					<MotoboyDashboardItem motoboy={motoboy} key={motoboy.id} />
				))}
			</div>
		</div>
	);
}
