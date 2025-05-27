import { NavItem } from "./navItem";

export function HomePageNav() {
	return (
		<div className="flex items-center justify-center gap-4 px-4 bg-primary-foreground border-primary border rounded-2xl">
			<NavItem>Preços</NavItem>
			<NavItem>Produto</NavItem>
			<NavItem>Sobre</NavItem>
		</div>
	);
}
