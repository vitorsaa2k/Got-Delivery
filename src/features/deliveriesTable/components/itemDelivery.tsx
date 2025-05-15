"use client";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery } from "@/types/global/types";
import { Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function ItemDelivery({ delivery }: { delivery: Delivery }) {
	const router = useRouter();
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const handleRemoveDelivery = useCallback(async () => {
		await removeDelivery(delivery);
	}, [delivery, removeDelivery]);
	const editDelivery = useCallback(() => {
		//TODO remove all deliveries when clicking edit button
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
				<button
					onClick={handleRemoveDelivery}
					className="hover:bg-red-300 hover:cursor-pointer p-2 rounded"
				>
					<Trash size={24} />
				</button>
			</div>
		</div>
	);
}
