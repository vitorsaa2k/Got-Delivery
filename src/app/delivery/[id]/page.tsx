"use client";
import { DeliveryForm } from "@/features/deliveryForm";
import { fetchDeliveryById } from "@/services/delivery";
import { Delivery } from "@/types/global/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditDeliveryPage() {
	const [delivery, setDelivery] = useState<Delivery>();
	const params = useParams();
	useEffect(() => {
		fetchDeliveryById(`${params.id}`).then(data => setDelivery(data));
	}, [params.id]);

	return (
		<>
			<DeliveryForm initialDelivery={delivery} />
		</>
	);
}
