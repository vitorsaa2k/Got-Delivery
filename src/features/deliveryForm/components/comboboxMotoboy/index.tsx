"use client";

import { useCallback, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../components/ui/popover";
import { Button } from "../../../../components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandList,
} from "../../../../components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { AddMotoboyDialog } from "./addMotoboyDialog";
import { MotoboyList } from "./motoboyList";

export function ComboboxMotoboy() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const selectedMotoboy = useMotoboyStore(state => state.selectedMotoboy);

	const motoboyList = useMotoboyStore(state => state.motoboyList);
	const selectMotoboy = useMotoboyStore(state => state.selectMotoboy);
	const handleSelect = useCallback(
		(name: string) => {
			const motoboy = motoboyList.find(i => i.name === name);
			if (!motoboy)
				return console.log("Nenhum motoboy encontrado com esse nome");
			selectMotoboy(motoboy);
		},
		[motoboyList, selectMotoboy]
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between border border-slate-400 hover:cursor-pointer"
				>
					{selectedMotoboy ? selectedMotoboy.name : "Selecionar Motoboy."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Pesquisar motoboy" />
					<CommandList>
						<CommandEmpty>
							<p>Nenhum Motoboy encontrado</p>
							<AddMotoboyDialog />
						</CommandEmpty>
						<MotoboyList
							handleSelect={handleSelect}
							setOpen={setOpen}
							setValue={setValue}
							value={selectedMotoboy?.name ?? value}
						/>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
