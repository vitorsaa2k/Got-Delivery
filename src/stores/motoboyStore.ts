import { create } from "zustand";
import { Motoboy } from "@/types/global/types";
import { CreateMotoboy } from "@/types/global/create";

interface MotoboyState {
	motoboyList: Motoboy[];
	selectedMotoboy: Motoboy | null;
	addMotoboy: (motoboy: CreateMotoboy) => Promise<void>;
	removeMoboboy: (motoboy: Motoboy) => void;
	updateMotoboy: (motoboy: Motoboy, updatedMotoboy: Motoboy) => void;
	selectMotoboy: (motoboy: Motoboy) => void;
}

export const useMotoboyStore = create<MotoboyState>()(set => ({
	motoboyList: [],
	selectedMotoboy: null,
	addMotoboy: async (motoboy: CreateMotoboy) => {
		const body = JSON.stringify(motoboy);
		let returnedMotoboy: Motoboy;
		await fetch("/api/motoboy", { body, method: "POST" })
			.then(res => res.json())
			.then((data: Motoboy) => {
				returnedMotoboy = data;
			});
		return set(state => ({
			motoboyList: [...state.motoboyList, returnedMotoboy],
		}));
	},
	removeMoboboy: (motoboy: Motoboy) =>
		set(state => {
			const index = state.motoboyList.findIndex(i => i.name === motoboy.name);
			const newList = state.motoboyList.splice(index, 1);
			return { motoboyList: newList };
		}),
	updateMotoboy: (motoboy: Motoboy, updatedMotoboy: Motoboy) =>
		set(state => {
			const index = state.motoboyList.findIndex(i => i.name === motoboy.name);
			const newList = state.motoboyList;
			newList[index] = updatedMotoboy;
			return { motoboyList: newList };
		}),
	selectMotoboy: (motoboy: Motoboy) =>
		set(() => ({ selectedMotoboy: motoboy })),
}));
