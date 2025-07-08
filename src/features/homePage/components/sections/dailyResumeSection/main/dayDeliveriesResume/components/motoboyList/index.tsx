import { useMemo } from "react";
import { MotoboyItem } from "./motoboyItem";
import { Delivery } from "@/types/global/types";

interface Occurrencies {
	name: string;
	deliveryValue: number;
}
export const deliveryList: Delivery[] = [
	{
		companyId: "",
		date: new Date(),
		finalValue: 5,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Moraes",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 10,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Moraes",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 5,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Moraes",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 10,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Moraes",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 10,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Vitor",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 10,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Vitor",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 6,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Vitor",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 6,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Luiz",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 9,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Luiz",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
	{
		companyId: "",
		date: new Date(),
		finalValue: 8,
		id: "1",
		motoboy: {
			companyId: "1",
			id: "1",
			name: "Luiz",
			pix: "123",
		},
		motoboyId: "999",
		neighborhood: "Centro",
		source: "PedeAi",
	},
];

export function MotoboyList() {
	const allMotoboys = useMemo(() => {
		return [...new Set(deliveryList.map(delivery => delivery.motoboy.name))];
	}, []);
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
