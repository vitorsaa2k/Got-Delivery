import { ReactNode } from "react";

export function CardWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="bg-primary-foreground flex flex-col justify-between p-3 lg:max-w-2xs lg:min-h-72 gap-6 rounded-2xl">
			{children}
		</div>
	);
}
