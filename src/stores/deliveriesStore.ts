import { CreateDelivery } from "@/types/global/create";
import { Delivery } from "@/types/global/types";
import { create } from "zustand";

interface DeliveryState {
	deliveryList: Delivery[];
	addDelivery: (delivery: CreateDelivery) => Promise<void>;
	removeDelivery: (delivery: Delivery) => void;
	updateDelivery: (delivery: Delivery, updatedDelivery: Delivery) => void;
	fetchAllDeliveries: () => Promise<Delivery[]>;
}

export const useDeliveriesStore = create<DeliveryState>()(set => ({
	deliveryList: [],
	addDelivery: async (delivery: CreateDelivery) => {
		const body = JSON.stringify(delivery);
		const returnedDelivery = await fetch("/api/delivery", {
			body,
			method: "POST",
		})
			.then(res => res.json())
			.then((data: Delivery) => data);
		set(state => ({ deliveryList: [...state.deliveryList, returnedDelivery] }));
	},
	removeDelivery: (delivery: Delivery) =>
		set(state => {
			const index = state.deliveryList.findIndex(i => i.id === delivery.id);
			state.deliveryList.splice(index, 1);
			const newList = [...state.deliveryList];
			return { deliveryList: newList };
		}),
	updateDelivery: (delivery: Delivery, updatedDelivery: Delivery) =>
		set(state => {
			const index = state.deliveryList.findIndex(i => i.id === delivery.id);
			const newList = state.deliveryList;
			newList[index] = updatedDelivery;
			return { deliveryList: newList };
		}),
	fetchAllDeliveries: async () => {
		const deliveryList = await fetch("/api/delivery")
			.then(res => res.json())
			.then((data: Delivery[]) => data);
		set(() => ({ deliveryList }));
		return deliveryList;
	},
}));
