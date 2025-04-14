"use client";
import { Button } from "@/components/ui/button";
import { Delivery, useDeliveriesStore } from "@/stores/deliveriesStore";
import { useCallback } from "react";

export function ItemDelivery({ delivery }: { delivery: Delivery }) {
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const handleRemoveDelivery = useCallback(() => {
		removeDelivery(delivery);
	}, [delivery, removeDelivery]);
	return (
		<div
			className="border border-black p-2 rounded flex flex-col"
			key={delivery.id}
		>
			<div>
				<p>Valor: {delivery.finalValue}</p>
				<p>Bairro: {delivery.neighborhood}</p>
				<p>Plataforma: {delivery.source}</p>
				<p>Motoboy: {delivery.motoboy.name}</p>
			</div>
			<div className="flex justify-end mt-1">
				<Button
					onClick={handleRemoveDelivery}
					className="hover:bg-red-400 justify-end"
				>
					Remover
				</Button>
			</div>
		</div>
	);
}
