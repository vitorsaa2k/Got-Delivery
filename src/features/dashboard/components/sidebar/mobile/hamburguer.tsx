"use client";
import { ListIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export function Hamburguer({
	setShowSidebar,
	showOverlay,
}: {
	setShowSidebar: Dispatch<SetStateAction<boolean>>;
	showOverlay: () => void;
}) {
	return (
		<button
			onClick={() => {
				setShowSidebar(state => !state);
				showOverlay();
			}}
			className="fixed top-0 right-0 m-6 rounded-full p-3 bg-primary text-white"
		>
			<ListIcon size={18} weight="bold" />
		</button>
	);
}
