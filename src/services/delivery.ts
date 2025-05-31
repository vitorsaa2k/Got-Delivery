import { CreateDelivery } from "@/types/global/create";
import { DashboardResume, Delivery } from "@/types/global/types";

async function fetchDeliveryById(id: string): Promise<Delivery> {
	const delivery = await fetch(`/api/delivery/${id}`)
		.then(res => res.json())
		.then((data: Delivery) => data);
	return delivery;
}

async function fetchAllDeliveriesByDate(date: string) {
	return await fetch(`/api/delivery/date/${date}`)
		.then(res => res.json())
		.then((data: Delivery[]) => data);
}

async function fetchAllDeliveriesByDateAndId(date: string, companyId: string) {
	return await fetch(`/api/delivery/date/${date}?id=${companyId}`)
		.then(res => res.json())
		.then((data: Delivery[]) => data);
}

async function postDelivery(delivery: CreateDelivery) {
	const body = JSON.stringify(delivery);
	return await fetch("/api/delivery", {
		body,
		method: "POST",
	})
		.then(res => res.json())
		.then((data: Delivery) => data);
}

async function deleteDelivery(delivery: Delivery) {
	return await fetch(`/api/delivery/${delivery.id}`, { method: "DELETE" })
		.then(res => res.json())
		.then(data => data)
		.catch(err => console.log(err));
}

async function fetchDeliveryResume(id: string) {
	return await fetch(`/api/delivery/resume?id=${id}`)
		.then(res => res.json())
		.then((data: DashboardResume) => data)
		.catch(err => console.log(err));
}

export {
	fetchDeliveryById,
	fetchAllDeliveriesByDate,
	postDelivery,
	deleteDelivery,
	fetchAllDeliveriesByDateAndId,
	fetchDeliveryResume,
};
