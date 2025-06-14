import { RefObject } from "react";

export function Overlay({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
	return (
		<div
			ref={ref}
			className={`w-screen inset-0 bg-black/20 fixed transition-opacity duration-300`}
		></div>
	);
}
