"use client";
import { Button } from "@/components/ui/button";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery } from "@/types/global/types";
import { Pencil } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function ItemDelivery({ delivery }: { delivery: Delivery }) {
	const router = useRouter();
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const handleRemoveDelivery = useCallback(() => {
		removeDelivery(delivery);
	}, [delivery, removeDelivery]);
	const editDelivery = useCallback(() => {
		router.push(`/delivery/${delivery.id}`);
	}, [router, delivery.id]);
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
			<div className="flex justify-end items-center mt-1 gap-2">
				<button
					className="hover:bg-gray-300 hover:cursor-pointer p-2 rounded"
					onClick={editDelivery}
				>
					<Pencil size={24} />
				</button>
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
