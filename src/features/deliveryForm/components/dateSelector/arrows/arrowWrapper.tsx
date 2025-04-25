import { ReactNode } from "react";

export function ArrowWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="hover:bg-zinc-300 hover:cursor-pointer p-1 rounded">
			{children}
		</div>
	);
}
