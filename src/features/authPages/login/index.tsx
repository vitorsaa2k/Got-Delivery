"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { removeTimeFromDate } from "@/utils/formatDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EnvelopeSimpleIcon, LockIcon } from "@phosphor-icons/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const redirectUrl = `/delivery/date/${removeTimeFromDate(
		new Date().toISOString()
	)}T00:00:00.000Z`;
	const router = useRouter();
	return (
		<div className="py-6 px-8 rounded-2xl flex flex-col gap-2 border items-center lg:w-[480px] ">
			<p className="text-3xl text-center font-bold">Bem-vindo de volta!</p>
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
						placeholder="Insira seu e-mail"
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
						placeholder="Insira a senha"
						type="password"
						onChange={e => setPassword(e.currentTarget.value)}
					/>
				</div>
			</label>
			<Link className="underline" href="/register">
				Não tenho uma conta
			</Link>
			<Button
				disabled={isSubmiting}
				className="hover:cursor-pointer py-6 w-full"
				onClick={() => {
					setIsSubmiting(true);
					signIn("credentials", {
						email,
						password,
						redirect: false,
						callbackUrl: redirectUrl,
					}).then(res => {
						if (res) {
							if (res.error) {
								setIsSubmiting(false);
								return toast(`${res.error}`);
							}
							if (!res.error && res.ok) {
								setIsComplete(true);
								toast("Sendo redirecionado para dashboard...");
								return setTimeout(() => {
									router.push(res.url ?? redirectUrl);
								}, 1000);
							}
						}
					});
				}}
			>
				{isSubmiting ? (
					<Spinner isComplete={isComplete} isLoading={isSubmiting} />
				) : (
					"Fazer Login"
				)}
			</Button>
		</div>
	);
}
