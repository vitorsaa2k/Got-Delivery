import { Motoboy } from "@/types/global/types";

async function postMotoboy({
	name,
	pix,
	companyId,
}: {
	name: string;
	pix: string;
	companyId: string;
}) {
	const body = JSON.stringify({ name, pix, companyId });
	return await fetch("/api/motoboy", { body, method: "POST" })
		.then(res => res.json())
		.then((data: Motoboy) => data);
}

async function fetchAllMotoboys(id: string) {
	return await fetch(`/api/motoboy?id=${id}`)
		.then(res => res.json())
		.then((data: Motoboy[]) => data);
}

async function deleteMotoboy(motoboyId: string) {
	const body = JSON.stringify({ id: motoboyId });
	return await fetch(`/api/motoboy`, { body, method: "DELETE" })
		.then(res => res.json())
		.then((data: Motoboy) => data);
}

async function fetchMotoboyById(id: string) {
	return await fetch(`/api/motoboy/${id}`)
		.then(res => res.json())
		.then((data: Motoboy) => data);
}

async function updateMotoboy({ name, pix, id }: Motoboy) {
	const body = JSON.stringify({ name, pix });
	return await fetch(`/api/motoboy/${id}`, { body, method: "POST" })
		.then(res => res.json())
		.then((data: Motoboy) => data);
}

export {
	postMotoboy,
	fetchAllMotoboys,
	deleteMotoboy,
	fetchMotoboyById,
	updateMotoboy,
};
