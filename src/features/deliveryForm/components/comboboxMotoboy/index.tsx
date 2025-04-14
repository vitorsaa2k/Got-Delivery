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
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../../../../components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { AddMotoboyDialog } from "./addMotoboyDialog";

export function ComboboxMotoboy() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

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

	console.log(useMotoboyStore(state => state.motoboyList));

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between border border-slate-400 hover:cursor-pointer"
				>
					{value
						? motoboyList.find(motoboy => motoboy.name === value)?.name
						: "Selecionar Motoboy."}
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
						<CommandGroup>
							{motoboyList.map(motoboy => (
								<CommandItem
									key={motoboy.name}
									value={motoboy.name}
									onSelect={currentValue => {
										setValue(currentValue === value ? "" : currentValue);
										handleSelect(currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === motoboy.name ? "opacity-100" : "opacity-0"
										)}
									/>
									{motoboy.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
