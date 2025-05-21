import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { useMemo } from "react";
import { MotoboyItem } from "./motoboyItem";

interface Occurrencies {
	name: string;
	deliveryValue: number;
}

export function MotoboyList() {
	const deliveryList = useDeliveriesStore(state => state.deliveryList);
	const allMotoboys = useMemo(() => {
		return [...new Set(deliveryList.map(delivery => delivery.motoboy.name))];
	}, [deliveryList]);
	const eachMotoboyAmount = allMotoboys.map(motoboyName => {
		const allOccurencies: Occurrencies[] = [];
		deliveryList.forEach(delivery => {
			if (delivery.motoboy.name === motoboyName)
				allOccurencies.push({
					name: motoboyName,
					deliveryValue: delivery.finalValue,
				});
		});
		const finalMotoboyCost = allOccurencies
			.map(delivery => delivery.deliveryValue)
			.reduce((partSum, num) => partSum + num, 0);
		return { name: motoboyName, finalMotoboyCost };
	});
	return (
		<div>
			{eachMotoboyAmount.map(motoboy => (
				<MotoboyItem
					key={motoboy.name}
					name={motoboy.name}
					value={motoboy.finalMotoboyCost}
				/>
			))}
		</div>
	);
}
