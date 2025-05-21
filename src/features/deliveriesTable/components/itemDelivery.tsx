"use client";
import { deleteDelivery } from "@/services/delivery";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery } from "@/types/global/types";
import { Pencil, Trash } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export function ItemDelivery({ delivery }: { delivery: Delivery }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const deleteDeliveryMutator = useMutation({
		mutationFn: async () => {
			return await deleteDelivery(delivery);
		},
		onSuccess: async () => {
			removeDelivery(delivery);
			await queryClient.invalidateQueries({ queryKey: ["deliveryList"] });
			toast("Delivery removido com sucesso");
		},
	});
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const handleRemoveDelivery = useCallback(async () => {
		deleteDeliveryMutator.mutate();
	}, [deleteDeliveryMutator]);
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
			<div className="flex justify-center items-center mt-1 gap-2">
				<button
					className="hover:bg-gray-300 hover:cursor-pointer p-2 rounded"
					onClick={editDelivery}
				>
					<Pencil size={24} />
				</button>
				<button
					disabled={deleteDeliveryMutator.isPending}
					onClick={handleRemoveDelivery}
					className="hover:bg-red-300 hover:cursor-pointer p-2 rounded disabled:cursor-default"
				>
					<Trash size={24} />
				</button>
			</div>
		</div>
	);
}
