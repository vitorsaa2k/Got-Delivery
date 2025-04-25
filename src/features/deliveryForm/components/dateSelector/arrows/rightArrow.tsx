import { CaretRight } from "@phosphor-icons/react";
import { ArrowWrapper } from "./arrowWrapper";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { dateAddOneDay } from "@/utils/manageDate";

export function RightArrow() {
	const router = useRouter();
	const params = useParams();
	const handleAddDay = useCallback(() => {
		if (params.date !== undefined) {
			const nextDay = dateAddOneDay(`${params.date}`);
			router.push(`/delivery/date/${new Date(`${nextDay}`).toISOString()}`);
		}
	}, [params, router]);
	return (
		<button onClick={handleAddDay}>
			<ArrowWrapper>
				<CaretRight size={24} />
			</ArrowWrapper>
		</button>
	);
}
