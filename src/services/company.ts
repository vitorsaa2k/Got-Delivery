export async function updateCompanyName(id: string, name: string) {
	const body = JSON.stringify({ name });
	return await fetch(`/api/company/${id}`, { method: "PATCH", body })
		.then(res => res.json())
		.then((data: { ok: boolean }) => data);
}
