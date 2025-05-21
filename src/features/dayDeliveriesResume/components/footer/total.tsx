import { useDeliveriesStore } from "@/stores/deliveriesStore";

export function TotalAmount() {
	const deliveryList = useDeliveriesStore(state => state.deliveryList);
	const totalValue = deliveryList
		.map(delivery => delivery.finalValue)
		.reduce((partSum, a) => partSum + a, 0);
	const formatedValue = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(totalValue);

	return (
		<div className="flex justify-between">
			<p className="text-4xl font-bold">Total</p>
			<p className="text-4xl font-regular">{formatedValue}</p>
		</div>
	);
}
