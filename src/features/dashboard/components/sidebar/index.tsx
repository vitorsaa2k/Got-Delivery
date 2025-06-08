"use client";
import { removeTimeFromDate } from "@/utils/formatDate";
import { HouseIcon, MotorcycleIcon, PackageIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { SidebarItem } from "./sideBarItem";
import { SidebarHeader } from "./header";

export function Sidebar() {
	const [currentUrl, setCurrentUrl] = useState("");
	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);
	return (
		<aside className="flex-col p-2 gap-2 bg-primary text-primary-foreground h-screen hidden md:flex md:min-w-3xs">
			<SidebarHeader />
			<nav className="flex flex-col items-center gap-2 ">
				<SidebarItem href="/dashboard" currentUrl={currentUrl}>
					<HouseIcon size={20} />
					Home
				</SidebarItem>
				<SidebarItem
					href={`/delivery/date/${removeTimeFromDate(
						new Date().toISOString()
					)}T00:00:00.000Z`}
					currentUrl={currentUrl}
				>
					<PackageIcon size={20} />
					Deliveries
				</SidebarItem>
				<SidebarItem currentUrl={currentUrl} href={"/motoboy"}>
					<MotorcycleIcon size={20} />
					Motoboys
				</SidebarItem>
			</nav>
		</aside>
	);
}
