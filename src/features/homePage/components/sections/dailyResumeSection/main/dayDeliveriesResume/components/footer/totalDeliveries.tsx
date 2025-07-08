import { deliveryList } from "../motoboyList";

export function TotalDeliveries() {
	const totalDeliveries = deliveryList.length;
	return (
		<div>
			<p>
				<span className="font-bold">Deliverys: </span>
				{totalDeliveries}
			</p>
		</div>
	);
}
