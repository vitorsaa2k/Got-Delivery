"use client";
import { Button } from "@/components/ui/button";
import { DeliveryValueInput } from "./components/inputs/deliveryValue";
import { SelectMotoboyInput } from "./components/inputs/motoboy";
import { NeighborhoodInput } from "./components/inputs/neighborhood";
import { DeliverySourceInput } from "./components/inputs/source";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { v4 as uuid } from "uuid";
import { Delivery, SourceType } from "@/types/global/types";

export function DeliveryForm() {
	const [deliveryValue, setDeliveryValue] = useState<string>("");
	const [neighborhood, setNeighborhood] = useState<string>("");
	const [source, setSource] = useState<SourceType>("Ifood");
	const selectedMotoboy = useMotoboyStore(state => state.selectedMotoboy);
	const deliveries = useDeliveriesStore(state => state.deliveryList);
	const addDelivery = useDeliveriesStore(state => state.addDelivery);
	const handleAddDelivery = useCallback(async () => {
		if (!selectedMotoboy) return console.log("Selecione o motoboy");
		const delivery: Delivery = {
			finalValue: parseInt(deliveryValue),
			neighborhood: neighborhood,
			source,
			id: uuid(),
			motoboy: selectedMotoboy,
			motoboyId: selectedMotoboy.id,
			date: new Date(),
		};
		addDelivery(delivery);
	}, [addDelivery, source, neighborhood, deliveryValue, selectedMotoboy]);

	const handleSelectChange = useCallback((e: SourceType) => {
		setSource(e);
	}, []);
	useEffect(() => {
		console.log(deliveries, "deliveries");
	}, [deliveries]);

	const handleDeliveryValueChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (deliveryValue.length === 1 && e.target.value === "")
				return setDeliveryValue("");
			const isNumber = !isNaN(parseFloat(e.target.value));
			if (!isNumber) return console.log("Isso não é um número");
			setDeliveryValue(e.target.value);
		},
		[deliveryValue.length]
	);

	const handleNeighborhoodChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setNeighborhood(e.target.value);
		},
		[]
	);
	return (
		<div className="m-2">
			<DeliveryValueInput
				deliveryValue={deliveryValue}
				handleDeliveryValueChange={handleDeliveryValueChange}
			/>
			<NeighborhoodInput
				neighborhood={neighborhood}
				handleNeighborhoodChange={handleNeighborhoodChange}
			/>

			<DeliverySourceInput handleSelectChange={handleSelectChange} />
			<SelectMotoboyInput />
			<div>
				<Button className="hover:cursor-pointer" onClick={handleAddDelivery}>
					Confirmar
				</Button>
			</div>
		</div>
	);
}
