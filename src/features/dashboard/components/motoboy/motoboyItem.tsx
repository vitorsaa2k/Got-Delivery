import { Motoboy } from "@/types/global/types";
import { Pencil } from "@phosphor-icons/react";
import Link from "next/link";

export function MotoboyDashboardItem({ motoboy }: { motoboy: Motoboy }) {
	return (
		<div className="flex items-center">
			<p>{motoboy.name}</p>
			<Link href={`/motoboy/${motoboy.id}`}>
				<Pencil size={32} />
			</Link>
		</div>
	);
}
