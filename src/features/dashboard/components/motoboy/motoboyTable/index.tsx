import { Motoboy } from "@/types/global/types";
import { columns } from "./columns";
import { DataTable } from "./table";

export function MotoboyTable({ motoboyList }: { motoboyList: Motoboy[] }) {
	return (
		<div>
			<DataTable columns={columns} data={motoboyList} />
		</div>
	);
}
