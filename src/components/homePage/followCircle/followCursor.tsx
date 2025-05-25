"use client";

import { useEffect, useRef } from "react";

export function FollowCursor() {
	const ref = useRef<HTMLDivElement>(null);
	const centerHorizontal = window.innerWidth / 2;
	const centerVertical = window.innerHeight / 2;
	useEffect(() => {
		if (!ref.current) return;
		const handleMouseMovement = (e: MouseEvent) => {
			if (!ref.current) return;
			ref.current.animate(
				{
					transform: `translate(${e.x}px, ${e.y}px)`,
				},
				{ duration: 1000, fill: "forwards" }
			);
		};
		window.addEventListener("mousemove", handleMouseMovement);

		return () => {
			window.removeEventListener("mousemove", handleMouseMovement);
		};
	}, []);

	const gradientStyle: React.CSSProperties = {
		background: `radial-gradient(circle farthest-side,rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 1%, rgba(0, 0, 0, 0) 100%)`,
		transform: `translate(${
			ref.current?.getBoundingClientRect().x ?? centerHorizontal
		}px, ${ref.current?.getBoundingClientRect().y ?? centerVertical}px)`,
		width: "150px",
		height: "150px",
		position: "fixed",
		top: "-75px",
		left: "-75px",
		borderRadius: "50%",
		zIndex: -1,
		display: window.innerWidth <= 1024 ? "none" : "block",
	};

	return <div ref={ref} style={gradientStyle}></div>;
}
