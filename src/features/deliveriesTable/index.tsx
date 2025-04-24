"use client";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { ItemDelivery } from "./components/itemDelivery";
import { useEffect } from "react";

export function DeliveryTable() {
	const deliveryList = useDeliveriesStore(state => state.deliveryList);
	const fetchAllDeliveries = useDeliveriesStore(
		state => state.fetchAllDeliveries
	);
	useEffect(() => {
		fetchAllDeliveries();
	}, [fetchAllDeliveries]);
	return (
		<div className="grid gap-2 grid-cols-4 m-2">
			{deliveryList.map(delivery => (
				<ItemDelivery key={delivery.id} delivery={delivery} />
			))}
		</div>
	);
}
