import { Delivery } from "@/types/global/types";

async function fetchDeliveryById(id: string): Promise<Delivery> {
	const delivery = await fetch(`/api/delivery/${id}`)
		.then(res => res.json())
		.then((data: Delivery) => data);
	return delivery;
}

export { fetchDeliveryById };
