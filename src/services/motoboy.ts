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

export { postMotoboy, fetchAllMotoboys };
