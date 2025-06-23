"use client";

import { SignOutIcon } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";

export function VerifyHeader() {
	const session = useSession();
	return (
		<header className="flex justify-end gap-2 items-center">
			<p>Empresa: {session.data?.user.name?.toUpperCase()}</p>
			<button
				onClick={() => signOut()}
				className="bg-red-400 rounded p-2 hover:cursor-pointer flex items-center text-white"
			>
				<SignOutIcon className="" size={20} />
			</button>
		</header>
	);
}
