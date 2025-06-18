"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ApiResponse } from "@/types/global/types";
import {
	BuildingsIcon,
	EnvelopeSimpleIcon,
	LockIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const router = useRouter();
	return (
		<div className="py-6 px-8 rounded-2xl flex flex-col gap-2 border items-center lg:w-[480px] ">
			<p className="text-2xl font-bold">Crie uma conta em segundos!</p>
			<label className="w-full flex flex-col items-center">
				<p className="self-start">Nome da empresa</p>
				<div className="relative w-full">
					<BuildingsIcon
						weight="light"
						size={24}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					/>
					<Input
						className="pl-11 h-12"
						placeholder="Ifood"
						onChange={e => setName(e.currentTarget.value)}
					/>
				</div>
			</label>
			<label className="w-full flex flex-col items-center">
				<p className="self-start">Email</p>
				<div className="relative w-full ">
					<EnvelopeSimpleIcon
						weight="light"
						size={24}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					/>
					<Input
						className="pl-11 h-12"
						placeholder="exemplo@site.com"
						onChange={e => setEmail(e.currentTarget.value)}
					/>
				</div>
			</label>
			<label className="w-full flex flex-col items-center">
				<p className="self-start">Senha</p>
				<div className="relative w-full">
					<LockIcon
						weight="light"
						size={24}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					/>
					<Input
						className="pl-11 h-12"
						placeholder="Mínimo de 8 caracteres"
						type="password"
						onChange={e => setPassword(e.currentTarget.value)}
					/>
				</div>
			</label>
			<Button
				disabled={isSubmiting}
				className="hover:cursor-pointer py-6 w-full"
				onClick={() => {
					setIsSubmiting(true);
					setIsComplete(false);
					const body = JSON.stringify({ name, password, email });
					fetch("/api/auth/register", { body, method: "POST" })
						.then(res => res.json())
						.then((data: ApiResponse) => {
							setIsComplete(true);

							if (data.error) {
								setIsSubmiting(false);
								toast(data.error);
								return;
							}
							setTimeout(() => {
								setIsSubmiting(false);
								router.push("/login");
							}, 1000);
						});
				}}
			>
				{isSubmiting ? (
					<Spinner isComplete={isComplete} isLoading={isSubmiting} />
				) : (
					"Registrar"
				)}
			</Button>
		</div>
	);
}
