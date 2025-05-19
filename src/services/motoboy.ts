import { Motoboy } from "@/types/global/types";

async function postMotoboy({ name, pix }: { name: string; pix: string }) {
	const body = JSON.stringify({ name, pix });
	return await fetch("/api/motoboy", { body, method: "POST" })
		.then(res => res.json())
		.then((data: Motoboy) => data);
}

async function fetchAllMotoboys() {
	return await fetch("/api/motoboy")
		.then(res => res.json())
		.then((data: Motoboy[]) => data);
}

export { postMotoboy, fetchAllMotoboys };
