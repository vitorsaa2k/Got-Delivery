"use client";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { ItemDelivery } from "./components/itemDelivery";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export function DeliveryTable() {
	const deliveryList = useDeliveriesStore(state => state.deliveryList);
	const fetchAllDeliveriesByDate = useDeliveriesStore(
		state => state.fetchAllDeliveriesByDate
	);
	const params = useParams();
	useEffect(() => {
		if (params !== undefined)
			fetchAllDeliveriesByDate(`${decodeURIComponent(`${params.date}`)}`);
	}, [fetchAllDeliveriesByDate, params]);
	return (
		<div className="grid gap-2 grid-cols-4 m-2">
			{deliveryList.map(delivery => (
				<ItemDelivery key={delivery.id} delivery={delivery} />
			))}
		</div>
	);
}
