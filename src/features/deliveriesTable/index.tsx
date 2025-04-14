"use client";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { ItemDelivery } from "./components/itemDelivery";

export function DeliveryTable() {
	const deliveryList = useDeliveriesStore(state => state.deliveryList);
	return (
		<div className="grid gap-2 grid-cols-4">
			{deliveryList.map(delivery => (
				<ItemDelivery key={delivery.id} delivery={delivery} />
			))}
		</div>
	);
}
