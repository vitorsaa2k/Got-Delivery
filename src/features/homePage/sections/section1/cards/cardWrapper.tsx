import { ReactNode } from "react";

export function CardWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="bg-primary-foreground flex flex-col justify-between p-3 max-w-2xs gap-6 rounded-2xl ">
			{children}
		</div>
	);
}
