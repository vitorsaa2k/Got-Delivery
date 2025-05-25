"use client";

import { useEffect, useRef, useState } from "react";

export function FollowCursor() {
	const [center, setCenter] = useState({ x: 0, y: 0 });
	const [isMobile, setIsMobile] = useState(true);
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!ref.current) return;
		const handleResize = () => {
			setCenter({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
			});
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();
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
		transform: `translate(${center.x}px, ${center.y}px)`,
		width: "150px",
		height: "150px",
		position: "fixed",
		top: "-75px",
		left: "-75px",
		borderRadius: "50%",
		zIndex: -1,
		display: isMobile ? "none" : "block",
	};

	return <div ref={ref} style={gradientStyle}></div>;
}
