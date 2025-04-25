import { removeTimeFromDate } from "@/utils/removeTimeDate";
import { useParams } from "next/navigation";

export function DateButton() {
	const params = useParams();
	const date = removeTimeFromDate(
		new Date(decodeURIComponent(`${params.date}`)).toISOString()
	);
	return (
		<>
			<p className="font-bold text-3xl">{date}</p>
		</>
	);
}
