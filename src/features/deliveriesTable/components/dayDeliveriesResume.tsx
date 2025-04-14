"use client";

import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { useEffect, useMemo } from "react";

interface Occurrencies {
	name: string;
	deliveryValue: number;
}

export function DayDeliveriesResume() {
	const deliveryList = useDeliveriesStore(state => state.deliveryList);
	const totalValue = deliveryList
		.map(delivery => delivery.finalValue)
		.reduce((partSum, a) => partSum + a, 0);
	const totalDeliveries = deliveryList.length;
	const allMotoboys = useMemo(() => {
		return [...new Set(deliveryList.map(delivery => delivery.motoboy))];
	}, [deliveryList]);
	const eachMotoboyAmount = allMotoboys.map(motoboy => {
		const allOccurencies: Occurrencies[] = [];
		deliveryList.forEach(delivery => {
			if (delivery.motoboy.name === motoboy.name)
				allOccurencies.push({
					name: motoboy.name,
					deliveryValue: delivery.finalValue,
				});
		});
		const finalMotoboyCost = allOccurencies
			.map(delivery => delivery.deliveryValue)
			.reduce((partSum, num) => partSum + num, 0);
		return { name: motoboy.name, finalMotoboyCost };
	});
	useEffect(() => {
		console.log(eachMotoboyAmount);
		console.log(allMotoboys);
	}, [eachMotoboyAmount, allMotoboys]);

	return (
		<div className="m-2">
			<p>Valor total: {totalValue}</p>
			<p>Total deliverys: {totalDeliveries}</p>
			<div>
				<p>Valor para cada motoboy:</p>
				{eachMotoboyAmount.map(motoboy => (
					<div key={motoboy.name}>
						<p>Motoboy: {motoboy.name}</p>
						<p>Valor a pagar R${motoboy.finalMotoboyCost},00</p>
					</div>
				))}
			</div>
		</div>
	);
}
