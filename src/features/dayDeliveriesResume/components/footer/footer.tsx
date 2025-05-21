import { TotalAmount } from "./total";
import { TotalDeliveries } from "./totalDeliveries";

export function DailyResumeFooter() {
	return (
		<div>
			<hr></hr>
			<TotalAmount />
			<TotalDeliveries />
		</div>
	);
}
