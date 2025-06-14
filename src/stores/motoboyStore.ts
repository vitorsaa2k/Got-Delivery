import { create } from "zustand";
import { Motoboy } from "@/types/global/types";

interface MotoboyState {
	motoboyList: Motoboy[];
	selectedMotoboy: Motoboy | null;
	addMotoboy: (motoboy: Motoboy) => void;
	removeMoboboy: (motoboy: Motoboy) => void;
	updateMotoboy: (motoboy: Motoboy, updatedMotoboy: Motoboy) => void;
	selectMotoboy: (motoboy: Motoboy) => void;
	updateMotoboyList: (motoboyList: Motoboy[]) => Motoboy[];
}

export const useMotoboyStore = create<MotoboyState>()(set => ({
	motoboyList: [],
	selectedMotoboy: null,
	addMotoboy: (motoboy: Motoboy) => {
		set(state => ({
			motoboyList: [...state.motoboyList, motoboy],
		}));
	},
	removeMoboboy: (motoboy: Motoboy) =>
		set(state => {
			const index = state.motoboyList.findIndex(i => i.id === motoboy.id);
			const newList = state.motoboyList.splice(index, 1);
			return { motoboyList: newList };
		}),
	updateMotoboy: (motoboy: Motoboy, updatedMotoboy: Motoboy) =>
		set(state => {
			const index = state.motoboyList.findIndex(i => i.id === motoboy.id);
			const newList = state.motoboyList;
			newList[index] = updatedMotoboy;
			return { motoboyList: newList };
		}),
	selectMotoboy: (motoboy: Motoboy) =>
		set(() => ({ selectedMotoboy: motoboy })),
	updateMotoboyList: (motoboyList: Motoboy[]) => {
		set(() => ({ motoboyList }));
		return motoboyList;
	},
}));
