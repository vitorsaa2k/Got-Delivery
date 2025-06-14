import { CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { fetchAllMotoboys } from "@/services/motoboy";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
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
