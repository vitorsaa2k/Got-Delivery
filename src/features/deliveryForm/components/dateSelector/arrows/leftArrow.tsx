import { CaretLeft } from "@phosphor-icons/react";
import { ArrowWrapper } from "./arrowWrapper";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { dateRemoveOneDay } from "@/utils/manageDate";

export function LeftArrow() {
	const router = useRouter();
	const params = useParams();
	const handleAddDay = useCallback(() => {
		if (params.date !== undefined) {
			const previousDay = dateRemoveOneDay(`${params.date}`);
			router.push(`/delivery/date/${new Date(`${previousDay}`).toISOString()}`);
		}
	}, [params, router]);

	return (
		<button onClick={handleAddDay}>
			<ArrowWrapper>
				<CaretLeft size={24} />
			</ArrowWrapper>
		</button>
	);
}
