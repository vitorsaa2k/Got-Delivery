import { create } from "zustand";

export interface Motoboy {
	name: string;
	pix: string;
}

interface MotoboyState {
	motoboyList: Motoboy[];
	selectedMotoboy: Motoboy | null;
	addMotoboy: (motoboy: Motoboy) => void;
	removeMoboboy: (motoboy: Motoboy) => void;
	updateMotoboy: (motoboy: Motoboy, updatedMotoboy: Motoboy) => void;
	selectMotoboy: (motoboy: Motoboy) => void;
}

export const useMotoboyStore = create<MotoboyState>()(set => ({
	motoboyList: [
		{
			name: "Vitor",
			pix: "Vitor",
		},
		{
			name: "Neto",
			pix: "705.358.654-57",
		},
		{
			name: "Morais",
			pix: "Morais",
		},
	],
	selectedMotoboy: null,
	addMotoboy: (motoboy: Motoboy) =>
		set(state => ({ motoboyList: [...state.motoboyList, motoboy] })),
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
