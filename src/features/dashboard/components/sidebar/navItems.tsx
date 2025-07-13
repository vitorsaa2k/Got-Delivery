"use client";
import { removeTimeFromDate } from "@/utils/formatDate";
import { SidebarItem } from "./sideBarItem";
import { MotorcycleIcon, PackageIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function NavItems() {
	const [currentUrl, setCurrentUrl] = useState("");
	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);
	return (
		<nav className="flex flex-col items-center gap-2 ">
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
	);
}
