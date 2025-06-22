"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { verifyAccountViaCode } from "@/services/verify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RequestCodeButton } from "./components/requestCodeButton";
import { removeTimeFromDate } from "@/utils/formatDate";

export default function VerifyForm() {
	const router = useRouter();
	const [code, setCode] = useState("");
	const [isComplete, setIsComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	async function verifyAccount() {
		setIsLoading(true);
		await verifyAccountViaCode(code);
		setIsComplete(true);
		setTimeout(() => {
			router.push(
				`/delivery/date/${removeTimeFromDate(
					new Date().toISOString()
				)}T00:00:00.000Z`
			);
		}, 1000);
	}

	return (
		<>
			<h1 className="text-3xl font-bold">
				O e-mail de verificação incluindo um código foi enviado ao seu email.
			</h1>
			<div className="flex flex-col items-center gap-2">
				<label>
					Código de verificação
					<Input onChange={e => setCode(e.currentTarget.value)} />
				</label>
				<Button
					className="hover:cursor-pointer"
					disabled={isLoading}
					onClick={verifyAccount}
				>
					{isLoading ? (
						<Spinner isLoading isComplete={isComplete} />
					) : (
						"Verificar"
					)}
				</Button>
				<RequestCodeButton />
			</div>
		</>
	);
}
