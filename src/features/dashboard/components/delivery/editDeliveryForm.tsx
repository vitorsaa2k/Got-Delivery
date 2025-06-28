"use client";
import { Button } from "@/components/ui/button";
import { DeliveryForm } from "@/features/deliveryForm";
import { deleteDelivery, fetchDeliveryById } from "@/services/delivery";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery } from "@/types/global/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export function EditDeliveryForm() {
	const params = useParams();
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data: queryDelivery } = useQuery({
		queryKey: ["delivery"],
		queryFn: () => fetchDeliveryById(`${params.id}`),
	});
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const deleteDeliveryMutator = useMutation({
		mutationFn: async (delivery: Delivery) => {
			return await deleteDelivery(delivery);
		},
		onSuccess: async (delivery: Delivery) => {
			removeDelivery(delivery);
			await queryClient.invalidateQueries({ queryKey: ["deliveryList"] });
			toast("Delivery removido com sucesso");
			router.back();
		},
	});
	const handleDeleteDelivery = useCallback(async () => {
		if (queryDelivery) deleteDeliveryMutator.mutate(queryDelivery);
	}, [queryDelivery, deleteDeliveryMutator]);

	return (
		<div className="p-9">
			<DeliveryForm initialDelivery={queryDelivery} />
			<Button
				disabled={deleteDeliveryMutator.isPending}
				className="hover:cursor-pointer"
				onClick={handleDeleteDelivery}
			>
				Deletar
			</Button>
		</div>
	);
}
