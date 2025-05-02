"use client";
import { Button } from "@/components/ui/button";
import { DeliveryValueInput } from "./components/inputs/deliveryValue";
import { SelectMotoboyInput } from "./components/inputs/motoboy";
import { NeighborhoodInput } from "./components/inputs/neighborhood";
import { DeliverySourceInput } from "./components/inputs/source";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery, SourceType } from "@/types/global/types";
import { CreateDelivery } from "@/types/global/create";
import { toast } from "sonner";

interface DeliveryFormTypes {
	initialDelivery?: Delivery;
}

export function DeliveryForm({ initialDelivery }: DeliveryFormTypes) {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [deliveryValue, setDeliveryValue] = useState<string>("");
	const [neighborhood, setNeighborhood] = useState<string>("");
	const [source, setSource] = useState<SourceType>("Ifood");
	const selectMotoboy = useMotoboyStore(state => state.selectMotoboy);
	const selectedMotoboy = useMotoboyStore(state => state.selectedMotoboy);
	const postDelivery = useDeliveriesStore(state => state.postDelivery);
	const handlePostDelivery = useCallback(async () => {
		setIsFetching(true);
		if (!selectedMotoboy) return console.log("Selecione o motoboy");
		if (initialDelivery) {
			const delivery: Delivery = {
				id: initialDelivery.id,
				finalValue: parseInt(deliveryValue),
				neighborhood: neighborhood,
				source,
				motoboy: selectedMotoboy,
				motoboyId: selectedMotoboy.id,
				date: new Date(),
			};
			return await postDelivery(delivery).then(() => {
				setIsFetching(false);
				toast("Delivery Atualizado Com Sucesso");
			});
		}
		const delivery: CreateDelivery = {
			finalValue: parseInt(deliveryValue),
			neighborhood: neighborhood,
			source,
			motoboy: selectedMotoboy,
			motoboyId: selectedMotoboy.id,
			date: new Date(),
		};
		return await postDelivery(delivery).then(() => {
			setIsFetching(false);
			toast("Delivery Criado Com Sucesso");
		});
	}, [
		postDelivery,
		source,
		neighborhood,
		deliveryValue,
		selectedMotoboy,
		initialDelivery,
	]);

	const handleSelectChange = useCallback((e: SourceType) => {
		setSource(e);
	}, []);
	useEffect(() => {
		if (initialDelivery) {
			console.log(initialDelivery);
			setDeliveryValue(`${initialDelivery.finalValue}`);
			setNeighborhood(initialDelivery.neighborhood);
			setSource(initialDelivery.source);
			selectMotoboy(initialDelivery.motoboy);
		}
	}, [initialDelivery, selectMotoboy]);

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

			<DeliverySourceInput
				value={source}
				handleSelectChange={handleSelectChange}
			/>
			<SelectMotoboyInput />
			<div>
				<Button
					disabled={isFetching}
					className="hover:cursor-pointer"
					onClick={handlePostDelivery}
				>
					Confirmar
				</Button>
			</div>
		</div>
	);
}
