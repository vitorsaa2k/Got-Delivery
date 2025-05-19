"use client";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { ItemDelivery } from "./components/itemDelivery";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllDeliveriesByDate } from "@/services/delivery";

export function DeliveryTable() {
	const updateDeliveryList = useDeliveriesStore(
		state => state.updateDeliveryList
	);
	const params = useParams();
	const { data: deliveryList } = useQuery({
		queryKey: ["deliveryList"],
		queryFn: async () => {
			const deliveryList = await fetchAllDeliveriesByDate(
				`${decodeURIComponent(`${params.date}`)}`
			);
			updateDeliveryList(deliveryList);
			return deliveryList;
		},
	});
	if (!deliveryList) return <></>;
	return (
		<div className="grid gap-2 grid-cols-4 m-2">
			{deliveryList.map(delivery => (
				<ItemDelivery key={delivery.id} delivery={delivery} />
			))}
		</div>
	);
}
