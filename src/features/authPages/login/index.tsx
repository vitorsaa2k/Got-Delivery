"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { removeTimeFromDate } from "@/utils/formatDate";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const redirectUrl = `/delivery/date/${removeTimeFromDate(
		new Date().toISOString()
	)}T00:00:00.000Z`;
	const router = useRouter();
	return (
		<div className="p-4 rounded-2xl flex flex-col gap-2 border items-center">
			<label>
				Email
				<Input onChange={e => setEmail(e.currentTarget.value)} />
			</label>
			<label>
				Senha
				<Input onChange={e => setPassword(e.currentTarget.value)} />
			</label>
			<Button
				onClick={() => {
					signIn("credentials", {
						email,
						password,
						redirect: false,
						callbackUrl: redirectUrl,
					}).then(res => {
						if (res) {
							if (!res.error && res.status === 200)
								return router.push(res.url ?? redirectUrl);
						}
					});
				}}
			>
				Fazer Login
			</Button>
			<Link href="/register">Não tenho uma conta</Link>
		</div>
	);
}
