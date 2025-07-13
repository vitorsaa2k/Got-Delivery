import { SidebarHeader } from "./header";
import { MobileSidebar } from "./mobile/mobileSidebar";
import { NavItems } from "./navItems";

export function Sidebar() {
	return (
		<>
			<aside className="flex-col p-2 gap-2 bg-primary text-primary-foreground h-screen hidden md:flex md:min-w-3xs">
				<SidebarHeader />
				<NavItems />
			</aside>
			<MobileSidebar />
		</>
	);
}
