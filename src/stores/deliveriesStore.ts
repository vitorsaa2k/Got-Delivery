import { CreateDelivery } from "@/types/global/create";
import { Delivery } from "@/types/global/types";
import { toast } from "sonner";
import { create } from "zustand";

interface DeliveryState {
	deliveryList: Delivery[];
	postDelivery: (delivery: CreateDelivery) => Promise<void>;
	removeDelivery: (delivery: Delivery) => Promise<void>;
	updateDelivery: (delivery: Delivery, updatedDelivery: Delivery) => void;
	fetchAllDeliveriesByDate: (date: string) => Promise<Delivery[]>;
}

export const useDeliveriesStore = create<DeliveryState>()(set => ({
	deliveryList: [],
	postDelivery: async (delivery: CreateDelivery) => {
		const body = JSON.stringify(delivery);
		const returnedDelivery = await fetch("/api/delivery", {
			body,
			method: "POST",
		})
			.then(res => res.json())
			.then((data: Delivery) => data);
		set(state => ({ deliveryList: [...state.deliveryList, returnedDelivery] }));
	},
	removeDelivery: async (delivery: Delivery) => {
		set(state => {
			const index = state.deliveryList.findIndex(i => i.id === delivery.id);
			state.deliveryList.splice(index, 1);
			const newList = [...state.deliveryList];
			return { deliveryList: newList };
		});
		await fetch(`/api/delivery/${delivery.id}`, { method: "DELETE" })
			.then(() => toast("Delivery deletado com sucesso"))
			.catch(() => toast("Erro deletando delivery"));
	},
	updateDelivery: (delivery: Delivery, updatedDelivery: Delivery) =>
		set(state => {
			const index = state.deliveryList.findIndex(i => i.id === delivery.id);
			const newList = state.deliveryList;
			newList[index] = updatedDelivery;
			return { deliveryList: newList };
		}),
	fetchAllDeliveriesByDate: async (date: string) => {
		const deliveryList = await fetch(`/api/delivery/date/${date}`)
			.then(res => res.json())
			.then((data: Delivery[]) => data);
		set(() => ({ deliveryList }));
		return deliveryList;
	},
}));
