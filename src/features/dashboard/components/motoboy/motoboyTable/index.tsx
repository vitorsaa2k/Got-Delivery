import { Motoboy } from "@/types/global/types";
import { columns } from "./columns";
import { DataTable } from "./table";
import { AddMotoboyDialog } from "../comboboxMotoboy/addMotoboyDialog";

export function MotoboyTable({ motoboyList }: { motoboyList: Motoboy[] }) {
	return (
		<div className="flex flex-col gap-1">
			<DataTable columns={columns} data={motoboyList} />
			<AddMotoboyDialog />
		</div>
	);
}
