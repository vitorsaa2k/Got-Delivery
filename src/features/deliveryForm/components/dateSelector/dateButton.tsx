import { useParams, useRouter } from "next/navigation";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useState } from "react";
import { removeTimeFromDate } from "@/utils/formatDate";

export function DateButton() {
	const router = useRouter();
	const params = useParams();
	const noTimeDate = removeTimeFromDate(
		new Date(decodeURIComponent(`${params.date}`)).toISOString()
	);
	const [date, setDate] = useState<Date | undefined>(
		noTimeDate ? new Date(noTimeDate) : undefined
	);

	const handlePickDate = useCallback(
		(selectedDate: Date | undefined) => {
			setDate(selectedDate);
			router.push(
				`/delivery/date/${new Date(`${selectedDate}`).toISOString()}`
			);
		},
		[router]
	);
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[164px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						removeTimeFromDate(date.toISOString())
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handlePickDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
