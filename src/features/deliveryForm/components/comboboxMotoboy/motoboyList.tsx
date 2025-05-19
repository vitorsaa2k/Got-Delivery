import { CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MotoboyListTypes {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	handleSelect: (name: string) => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function MotoboyList({
	value,
	handleSelect,
	setOpen,
	setValue,
}: MotoboyListTypes) {
	const fetchAllMotoboys = useMotoboyStore(state => state.fetchAllMotoboys);
	const { data: motoboyList } = useQuery({
		queryKey: ["motoboyList"],
		queryFn: fetchAllMotoboys,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	if (!motoboyList) return <></>;
	return (
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
	);
}
