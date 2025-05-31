"use client";
import { removeTimeFromDate } from "@/utils/formatDate";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function Sidebar() {
	return (
		<aside className="flex-col p-2 justify-between gap-2 bg-primary text-primary-foreground h-screen hidden md:flex md:min-w-3xs">
			<nav className="flex flex-col items-center gap-2">
				<Link href={"/dashboard"}>Home</Link>
				<Link
					href={`/delivery/date/${removeTimeFromDate(
						new Date().toISOString()
					)}T00:00:00.000Z`}
				>
					Deliveries
				</Link>
				<Link href={"/motoboy"}>Motoboys</Link>
			</nav>
			<div className="flex justify-end">
				<button
					onClick={() => signOut()}
					className="bg-red-400 rounded p-2 hover:cursor-pointer flex items-center"
				>
					<SignOut className="" size={24} />
				</button>
			</div>
		</aside>
	);
}
