"use client";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { signOut, useSession } from "next-auth/react";

export function SidebarHeader() {
	const session = useSession();
	return (
		<header className="flex items-center justify-between">
			Empresa: {session?.data?.user.name?.toUpperCase()}{" "}
			<button
				onClick={() => signOut()}
				className="bg-red-400 rounded p-2 hover:cursor-pointer flex items-center"
			>
				<SignOutIcon className="" size={20} />
			</button>
		</header>
	);
}
