"use client";
import { fetchAllMotoboys } from "@/services/motoboy";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MotoboyTable } from "./motoboyTable";

export function Motoboy() {
	const updateMotoboyList = useMotoboyStore(state => state.updateMotoboyList);
	const session = useSession();
	const { data: motoboyList } = useQuery({
		queryKey: ["motoboyList"],
		queryFn: async () => {
			const motoboyList = await fetchAllMotoboys(session.data!.user.id);
			updateMotoboyList(motoboyList);
			return motoboyList;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	if (!motoboyList) return <></>;
	return (
		<div className="p-2">
			<MotoboyTable motoboyList={motoboyList} />
		</div>
	);
}
