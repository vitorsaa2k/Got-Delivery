import { Delivery } from "@/types/global/types";
import { create } from "zustand";

interface DeliveryState {
	deliveryList: Delivery[];
	addDelivery: (delivery: Delivery) => void;
	removeDelivery: (delivery: Delivery) => void;
	updateDelivery: (delivery: Delivery, updatedDelivery: Delivery) => void;
	updateDeliveryList: (deliveryList: Delivery[]) => Promise<Delivery[]>;
}

export const useDeliveriesStore = create<DeliveryState>()(set => ({
	deliveryList: [],
	addDelivery: async (delivery: Delivery) => {
		set(state => ({ deliveryList: [...state.deliveryList, delivery] }));
	},
	removeDelivery: (delivery: Delivery) => {
		set(state => {
			const index = state.deliveryList.findIndex(i => i.id === delivery.id);
			state.deliveryList.splice(index, 1);
			const newList = [...state.deliveryList];
			return { deliveryList: newList };
		});
	},
	updateDelivery: (delivery: Delivery, updatedDelivery: Delivery) =>
		set(state => {
			const index = state.deliveryList.findIndex(i => i.id === delivery.id);
			const newList = state.deliveryList;
			newList[index] = updatedDelivery;
			return { deliveryList: newList };
		}),
	updateDeliveryList: async (deliveryList: Delivery[]) => {
		set(() => ({ deliveryList }));
		return deliveryList;
	},
}));
