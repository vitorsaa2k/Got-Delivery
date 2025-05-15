"use client";
import { Button } from "@/components/ui/button";
import { DeliveryForm } from "@/features/deliveryForm";
import { fetchDeliveryById } from "@/services/delivery";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery } from "@/types/global/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function EditDeliveryPage() {
	const [delivery, setDelivery] = useState<Delivery>();
	const removeDelivery = useDeliveriesStore(state => state.removeDelivery);
	const params = useParams();
	const router = useRouter();
	const handleDeleteDelivery = useCallback(() => {
		if (delivery) removeDelivery(delivery);
		router.back();
	}, [delivery, removeDelivery, router]);
	useEffect(() => {
		fetchDeliveryById(`${params.id}`).then(data => setDelivery(data));
	}, [params.id]);

	return (
		<>
			<DeliveryForm initialDelivery={delivery} />
			<Button className="hover:cursor-pointer" onClick={handleDeleteDelivery}>
				Delete
			</Button>
		</>
	);
}
