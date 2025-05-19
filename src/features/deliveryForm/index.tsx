"use client";
import { Button } from "@/components/ui/button";
import { DeliveryValueInput } from "./components/inputs/deliveryValue";
import { SelectMotoboyInput } from "./components/inputs/motoboy";
import { NeighborhoodInput } from "./components/inputs/neighborhood";
import { DeliverySourceInput } from "./components/inputs/source";
import { ChangeEvent, useCallback, useEffect, useReducer } from "react";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useDeliveriesStore } from "@/stores/deliveriesStore";
import { Delivery, SourceType } from "@/types/global/types";
import { CreateDelivery } from "@/types/global/create";
import { toast } from "sonner";
import { initReducer, reducer } from "@/reducers/deliveryFormReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDelivery } from "@/services/delivery";

interface DeliveryFormComponentTypes {
	initialDelivery?: Delivery;
}

export function DeliveryForm({ initialDelivery }: DeliveryFormComponentTypes) {
	const addDelivery = useDeliveriesStore(state => state.addDelivery);
	const [deliveryState, dispatch] = useReducer(
		reducer,
		initialDelivery,
		initReducer
	);
	const queryClient = useQueryClient();
	const deliveryListMutator = useMutation({
		mutationFn: async (delivery: CreateDelivery | Delivery) => {
			return await postDelivery(delivery);
		},
		onSuccess: (data: Delivery) => {
			if (initialDelivery) {
				return toast("Delivery Atualizado Com Sucesso");
			}
			queryClient.invalidateQueries({ queryKey: ["deliveryList"] });
			addDelivery(data);
			toast("Delivery Criado Com Sucesso");
		},
	});
	const selectMotoboy = useMotoboyStore(state => state.selectMotoboy);
	const selectedMotoboy = useMotoboyStore(state => state.selectedMotoboy);
	const handlePostDelivery = useCallback(async () => {
		if (!selectedMotoboy) return toast("Selecione o motoboy");
		if (initialDelivery) {
			const delivery: Delivery = {
				...deliveryState,
				id: initialDelivery.id,
				motoboy: selectedMotoboy,
				motoboyId: selectedMotoboy.id,
				date: new Date(),
			};
			return deliveryListMutator.mutate(delivery);
		}
		return deliveryListMutator.mutate({
			...deliveryState,
			date: new Date(),
			motoboy: selectedMotoboy,
			motoboyId: selectedMotoboy.id,
		});
	}, [deliveryListMutator, deliveryState, initialDelivery, selectedMotoboy]);

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
					disabled={deliveryListMutator.isPending}
					className="hover:cursor-pointer"
					onClick={handlePostDelivery}
				>
					Confirmar
				</Button>
			</div>
		</div>
	);
}
