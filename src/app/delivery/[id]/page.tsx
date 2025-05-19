"use client";
import { Button } from "@/components/ui/button";
import { DeliveryForm } from "@/features/deliveryForm";
import { fetchDeliveryById } from "@/services/delivery";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function EditDeliveryPage() {
	const { data: delivery } = useQuery({
		queryKey: ["delivery"],
		queryFn: () => fetchDeliveryById(`${params.id}`),
	});
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const params = useParams();
	const router = useRouter();
	const handleDeleteDelivery = useCallback(() => {
		if (delivery) removeDelivery(delivery);
		router.back();
	}, [delivery, removeDelivery, router]);

	return (
		<>
			<DeliveryForm initialDelivery={delivery} />
			<Button className="hover:cursor-pointer" onClick={handleDeleteDelivery}>
				Delete
			</Button>
		</>
	);
}
