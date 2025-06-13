import { RefObject } from "react";

export function Overlay({
	ref,
	showSidebar,
}: {
	ref: RefObject<HTMLDivElement | null>;
	showSidebar: boolean;
}) {
	return (
		<div
			ref={ref}
			className={`w-screen hidden inset-0 bg-black/20 fixed transition-opacity duration-300 ${
				showSidebar ? "opacity-100" : "opacity-0"
			}`}
		></div>
	);
}
