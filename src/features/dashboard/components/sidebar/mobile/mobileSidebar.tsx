"use client";

import { useEffect, useRef, useState } from "react";
import { Hamburguer } from "./hamburguer";
import { XIcon } from "@phosphor-icons/react";
import { SidebarHeader } from "../header";
import { Overlay } from "./overlay";
import { NavItems } from "../navItems";

export function MobileSidebar() {
	const [showSidebar, SetShowSidebar] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const hideOverlay = () => {
		const overlay = ref.current;
		if (!overlay) return;

		// Start fade out
		overlay.classList.remove("opacity-100");
		overlay.classList.add("opacity-0");

		// Wait for transition to finish
		overlay.addEventListener(
			"transitionend",
			() => {
				overlay.classList.add("hidden");
			},
			{ once: true } // ensures listener is removed after firing
		);
	};

	const showOverlay = () => {
		const overlay = ref.current;
		if (!overlay) return;

		// Make visible before animating
		overlay.classList.remove("hidden");
		// Force reflow to apply class removal before adding opacity
		void overlay.offsetWidth;
		overlay.classList.remove("opacity-0");
		overlay.classList.add("opacity-100");
	};
	useEffect(() => {
		hideOverlay();
	}, []);
	return (
		<div className="hidden max-md:block">
			<Overlay ref={ref} />
			<div
				className={`w-2/3 bg-primary-foreground fixed h-screen right-0 z-10 transform transition-transform duration-300 ${
					showSidebar ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="px-2 pt-2">
					<SidebarHeader />
				</div>
				<button
					onClick={() => {
						hideOverlay();
						SetShowSidebar(false);
					}}
					className={`absolute -left-10 rounded p-2 bg-primary-foreground top-1 z-10 transition-opacity ${
						showSidebar ? "opacity-100" : "opacity-0"
					}`}
				>
					<XIcon size={20} />
				</button>
				<NavItems />
			</div>
			<Hamburguer setShowSidebar={SetShowSidebar} showOverlay={showOverlay} />
		</div>
	);
}
