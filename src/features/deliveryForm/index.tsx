"use client";
import { Button } from "@/components/ui/button";
import { DeliveryValueInput } from "./components/inputs/deliveryValue";
import { SelectMotoboyInput } from "./components/inputs/motoboy";
import { NeighborhoodInput } from "./components/inputs/neighborhood";
import { DeliverySourceInput } from "./components/inputs/source";
import {
	ChangeEvent,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from "react";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery, SourceType } from "@/types/global/types";
import { CreateDelivery } from "@/types/global/create";
import { toast } from "sonner";
import { initReducer, reducer } from "@/reducers/deliveryFormReducer";

interface DeliveryFormComponentTypes {
	initialDelivery?: Delivery;
}

export function DeliveryForm({ initialDelivery }: DeliveryFormComponentTypes) {
	const [deliveryState, dispatch] = useReducer(
		reducer,
		initialDelivery,
		initReducer
	);
	// TODO add TanStackQuery to handle server and fetching state.
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const selectMotoboy = useMotoboyStore(state => state.selectMotoboy);
	const selectedMotoboy = useMotoboyStore(state => state.selectedMotoboy);
	const postDelivery = useDeliveriesStore(state => state.postDelivery);
	const handlePostDelivery = useCallback(async () => {
		setIsFetching(true);
		if (!selectedMotoboy) return console.log("Selecione o motoboy");
		if (initialDelivery) {
			const delivery: Delivery = {
				...deliveryState,
				id: initialDelivery.id,
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
			...deliveryState,
			motoboy: selectedMotoboy,
			motoboyId: selectedMotoboy.id,
			date: new Date(),
		};
		return await postDelivery(delivery).then(() => {
			setIsFetching(false);
			toast("Delivery Criado Com Sucesso");
		});
	}, [postDelivery, selectedMotoboy, initialDelivery, deliveryState]);

	const handleSelectChange = useCallback((e: SourceType) => {
		dispatch({
			type: "update_source",
			payload: e,
		});
	}, []);
	useEffect(() => {
		if (initialDelivery) {
			dispatch({ type: "update_delivery", payload: initialDelivery });
			selectMotoboy(initialDelivery.motoboy);
		}
	}, [initialDelivery, selectMotoboy]);

	const handleDeliveryValueChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (deliveryState.finalValue >= 1 && e.target.value === "")
				return dispatch({
					type: "update_delivery_value",
					payload: 0,
				});
			const isNumber = !isNaN(parseInt(e.target.value));
			if (!isNumber) return console.log("Isso não é um número");
			dispatch({
				type: "update_delivery_value",
				payload: parseInt(e.target.value),
			});
		},
		[deliveryState.finalValue]
	);

	const handleNeighborhoodChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch({
				type: "update_neighborhood",
				payload: e.target.value,
			});
		},
		[]
	);
	return (
		<div className="m-2">
			<DeliveryValueInput
				deliveryValue={deliveryState.finalValue.toString()}
				handleDeliveryValueChange={handleDeliveryValueChange}
			/>
			<NeighborhoodInput
				neighborhood={deliveryState.neighborhood}
				handleNeighborhoodChange={handleNeighborhoodChange}
			/>

			<DeliverySourceInput
				value={deliveryState.source}
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
