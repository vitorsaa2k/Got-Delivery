import { ReactNode } from "react";

export function NavItem({ children }: { children: ReactNode }) {
	return <p className="text-[20px] font-normal">{children}</p>;
}
