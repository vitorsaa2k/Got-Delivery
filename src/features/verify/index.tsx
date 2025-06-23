"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { verifyAccountViaCode } from "@/services/verify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RequestCodeButton } from "./components/requestCodeButton";
import { NoVerifyButton } from "./components/noVerifyButton";
import { VerifyHeader } from "./components/header";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";

export default function VerifyForm() {
	const router = useRouter();
	const [code, setCode] = useState("");
	const [isComplete, setIsComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	async function verifyAccount() {
		setIsLoading(true);
		await verifyAccountViaCode(code);
		setIsComplete(true);
		router.push(`/delivery/date/${getCurrentDateDefaultTime()}`);
		setTimeout(() => {}, 1000);
	}

	return (
		<div className="flex flex-col gap-2">
			<VerifyHeader />
			<h1 className="text-3xl font-bold text-center">
				O e-mail de verificação incluindo um código foi enviado ao seu email.
			</h1>
			<div className="flex flex-col items-center gap-2">
				<label className="flex max-md:flex-col whitespace-nowrap gap-2 items-center">
					Código de verificação
					<Input onChange={e => setCode(e.currentTarget.value)} />
					<RequestCodeButton />
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
				<NoVerifyButton />
			</div>
		</div>
	);
}
