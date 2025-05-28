"use client";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { ItemDelivery } from "./components/itemDelivery";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllDeliveriesByDateAndId } from "@/services/delivery";
import { useSession } from "next-auth/react";

export function DeliveryTable() {
	const session = useSession();
	const updateDeliveryList = useDeliveriesStore(
		state => state.updateDeliveryList
	);
	const params = useParams();
	const { data: deliveryList } = useQuery({
		queryKey: ["deliveryList"],
		queryFn: async () => {
			const deliveryList = await fetchAllDeliveriesByDateAndId(
				`${decodeURIComponent(`${params.date}`)}`,
				session.data!.user.id
			);
			updateDeliveryList(deliveryList);
			return deliveryList;
		},
	});
	if (!deliveryList) return <></>;
	return (
		<div className="flex gap-2 flex-wrap max-sm:justify-center">
			{deliveryList.map(delivery => (
				<ItemDelivery key={delivery.id} delivery={delivery} />
			))}
		</div>
	);
}
