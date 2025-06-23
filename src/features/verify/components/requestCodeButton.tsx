"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { requestNewVerificationCode } from "@/services/verify";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function RequestCodeButton() {
	const session = useSession();
	const [isComplete, setIsComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	async function requestNewCode() {
		setIsLoading(true);
		const account = session.data!.user;
		await requestNewVerificationCode(account.id, account.email!);
		toast("Novo código enviado!");
		setIsComplete(true);
		return;
	}
	return (
		<Button
			className="hover:cursor-pointer"
			disabled={isLoading}
			onClick={requestNewCode}
		>
			{isLoading ? (
				<Spinner isLoading isComplete={isComplete} />
			) : (
				"Enviar código novamente"
			)}
		</Button>
	);
}
