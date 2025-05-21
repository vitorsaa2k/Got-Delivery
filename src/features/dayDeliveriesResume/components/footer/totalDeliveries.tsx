import { useDeliveriesStore } from "@/stores/deliveriesStore";

export function TotalDeliveries() {
	const totalDeliveries = useDeliveriesStore(
		state => state.deliveryList
	).length;
	return (
		<div>
			<p>
				<span className="font-bold">Deliverys: </span>
				{totalDeliveries}
			</p>
		</div>
	);
}
