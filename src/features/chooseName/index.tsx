"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRedirectToDashboard } from "@/hooks/useRedirectToDashboard";
import { updateCompanyName } from "@/services/company";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function ChooseName() {
	const redirectToDashboard = useRedirectToDashboard();
	const session = useSession();
	const [name, setName] = useState("");
	async function handleFormSubmit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		await updateCompanyName(session.data!.user.id, name);
		redirectToDashboard();
	}
	return (
		<main className="flex items-center justify-center w-screen h-screen">
			<div className="flex-col items-center flex rounded border p-3">
				<h3 className="text-2xl">Escolha um nome</h3>
				<p>Logado com o e-mail: {session.data?.user.email}</p>
				<form className="flex flex-col items-center gap-1">
					<Input onChange={e => setName(e.currentTarget.value)} />
					<div className="flex gap-1">
						<Button className="hover:cursor-pointer" onClick={handleFormSubmit}>
							Confirmar
						</Button>
						<Button
							className="hover:cursor-pointer"
							onClick={e => {
								e.preventDefault();
								signOut();
							}}
							variant={"destructive"}
						>
							Sair
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
}
